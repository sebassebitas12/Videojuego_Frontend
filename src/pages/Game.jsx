import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import GameControls from '../components/GameControls'
import HUD from '../components/HUD'
import { fallbackLevel } from '../data/fallbackLevel'
import useGameLoop from '../hooks/useGameLoop'
import useKeyboard from '../hooks/useKeyboard'
import { getLevel } from '../services/api'

const PLAYER_SIZE = 34
const MOVE_SPEED = 230
const JUMP_SPEED = -520
const GRAVITY = 1250
const CAMERA_WIDTH = 960

function createGame(level) {
  return {
    player: { ...level.player, vx: 0, vy: 0, direction: 'right', grounded: false },
    enemies: level.enemies.map((enemy) => ({ ...enemy, width: 34, height: 30 })),
    collectibles: level.collectibles.map((item) => ({ ...item })),
    lives: 3,
    time: level.timeLimit,
    cameraX: 0,
  }
}

function overlaps(first, second) {
  return first.x < second.x + second.width && first.x + first.width > second.x && first.y < second.y + second.height && first.y + first.height > second.y
}

export default function Game() {
  const { level: levelParam } = useParams()
  const navigate = useNavigate()
  const { keysRef, consumePressed, pressKey, releaseKey } = useKeyboard()
  const [level, setLevel] = useState(fallbackLevel)
  const [game, setGame] = useState(() => createGame(fallbackLevel))
  const [loading, setLoading] = useState(true)
  const [apiSource, setApiSource] = useState('loading')
  const gameRef = useRef(game)
  const endedRef = useRef(false)

  useEffect(() => {
    let active = true
    getLevel(levelParam).then((result) => {
      if (!active) return
      const nextLevel = result.data || fallbackLevel
      setLevel(nextLevel)
      setApiSource(result.source)
      const nextGame = createGame(nextLevel)
      gameRef.current = nextGame
      setGame(nextGame)
      endedRef.current = false
      setLoading(false)
    })
    return () => { active = false }
  }, [levelParam])

  const updateGame = useCallback((updater) => {
    const next = typeof updater === 'function' ? updater(gameRef.current) : updater
    gameRef.current = next
    setGame(next)
  }, [])

  const finish = useCallback((result) => {
    if (endedRef.current) return
    endedRef.current = true
    const current = gameRef.current
    const collected = level.collectibles.length - current.collectibles.length
    const damage = 3 - current.lives
    const run = {
      runId: crypto.randomUUID(),
      alias: sessionStorage.getItem('playerAlias') || 'Ashen',
      score: Math.max(0, Math.round(current.time * 10 + collected * 150 - damage * 50)),
      time: Math.ceil(current.time),
      result,
      enemiesDefeated: level.enemies.length - current.enemies.length,
      damage,
      collectibles: collected,
      completedAt: new Date().toISOString(),
      levelId: level.id,
    }
    sessionStorage.setItem('run-' + run.runId, JSON.stringify(run))
    navigate('/results/' + run.runId)
  }, [level, navigate])

  const tick = useCallback((delta) => {
    if (loading || endedRef.current) return
    const current = gameRef.current
    const pressed = consumePressed()
    const left = keysRef.current.has('a') || keysRef.current.has('arrowleft')
    const right = keysRef.current.has('d') || keysRef.current.has('arrowright')
    const jump = pressed.has('w') || pressed.has('arrowup') || pressed.has(' ')
    const direction = left ? 'left' : right ? 'right' : current.player.direction
    const horizontal = left ? -MOVE_SPEED : right ? MOVE_SPEED : 0
    const player = { ...current.player, vx: horizontal, vy: current.player.vy + GRAVITY * delta, direction }
    if (jump && current.player.grounded) player.vy = JUMP_SPEED
    player.x = Math.max(0, Math.min(level.width - PLAYER_SIZE, player.x + player.vx * delta))
    const previousBottom = player.y + PLAYER_SIZE
    player.y += player.vy * delta
    player.grounded = false
    for (const platform of level.platforms) {
      const landing = player.vy >= 0 && previousBottom <= platform.y && player.y + PLAYER_SIZE >= platform.y && player.x + PLAYER_SIZE > platform.x && player.x < platform.x + platform.width
      if (landing) { player.y = platform.y - PLAYER_SIZE; player.vy = 0; player.grounded = true }
    }
    let lives = current.lives
    const defeated = new Set()
    const playerBox = { ...player, width: PLAYER_SIZE, height: PLAYER_SIZE }
    const enemies = current.enemies.map((enemy) => {
      const next = { ...enemy, x: enemy.x + enemy.direction * 45 * delta }
      if (next.x < 250 || next.x > level.width - 70) next.direction *= -1
      if (overlaps(playerBox, { ...next, width: next.width, height: next.height })) {
        if (player.vy > 0 && player.y + PLAYER_SIZE - enemy.y < 18) { defeated.add(enemy.id); player.vy = JUMP_SPEED * 0.55 }
        else if (current.player.x !== enemy.x) { lives -= 1; player.x = level.player.x; player.y = level.player.y; player.vy = 0 }
      }
      return next
    }).filter((enemy) => !defeated.has(enemy.id))
    const collectibles = current.collectibles.filter((item) => !overlaps(playerBox, { ...item, width: 24, height: 30 }))
    const nextTime = Math.max(0, current.time - delta)
    const cameraX = Math.max(0, Math.min(level.width - CAMERA_WIDTH, player.x - CAMERA_WIDTH * 0.42))
    updateGame({ ...current, player, enemies, collectibles, lives, time: nextTime, cameraX })
    if (lives <= 0 || player.y > level.height + 40 || nextTime <= 0) finish('defeat')
    else if (player.x + PLAYER_SIZE >= level.goal.x && collectibles.length === 0) finish('victory')
  }, [consumePressed, finish, keysRef, level, loading, updateGame])

  useGameLoop(!loading, tick)

  if (loading) return <main className="screen center"><section className="panel"><p className="eyebrow">ROUTE 01</p><h1>Preparando la ruta...</h1><p className="muted">Cargando el mapa de la región.</p></section></main>
  const collected = level.collectibles.length - game.collectibles.length
  return <main className="screen game-screen platformer-screen">
    {apiSource === 'fallback' && <div className="api-notice">API no disponible. Jugando con el nivel local.</div>}
    <HUD alias={sessionStorage.getItem('playerAlias') || 'Ashen'} lives={game.lives} time={Math.ceil(game.time)} enemies={game.enemies.length} hasKey={collected === level.collectibles.length} />
    <section className="platformer-layout">
      <div><GameBoard level={level} player={game.player} enemies={game.enemies} collectibles={game.collectibles} cameraX={game.cameraX} /><GameControls onMove={(direction, active) => { const key = direction === 'left' ? 'a' : 'd'; active ? pressKey(key) : releaseKey(key) }} onJump={() => pressKey('w')} /></div>
      <aside className="game-sidebar"><section className="side-card"><p className="eyebrow">MISSION</p><h2>Ruta a Pueblo Paleta</h2><p>Recoge todas las Poké Balls y llega a la bandera para completar el nivel.</p><div className="mission-count">{collected} / {level.collectibles.length}</div></section><section className="side-card"><p className="eyebrow">CONTROLES</p><p><kbd>A D</kbd> correr</p><p><kbd>W / SPACE</kbd> saltar</p></section><section className="side-card"><p className="eyebrow">ESTADO</p><p>{game.enemies.length} Rattata patrullando</p><p>{game.player.grounded ? 'En el suelo' : 'En el aire'}</p></section></aside>
    </section>
  </main>
}
