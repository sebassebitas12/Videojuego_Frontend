import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import GameControls from '../components/GameControls'
import HUD from '../components/HUD'
import { fallbackLevel } from '../data/fallbackLevel'
import useGameLoop from '../hooks/useGameLoop'
import useKeyboard from '../hooks/useKeyboard'
import { getLevel } from '../services/api'
import { KEY_TO_DIRECTION, canEnterCell, calculateScore, cellId, getAdjacentCell, moveCell, moveEnemies, sameCell } from '../utils/game'

const INITIAL_LIVES = 3

export default function Game() {
  const { level: levelParam } = useParams()
  const navigate = useNavigate()
  const { keysRef, consumePressed } = useKeyboard()
  const [level, setLevel] = useState(fallbackLevel)
  const [loading, setLoading] = useState(true)
  const [apiSource, setApiSource] = useState('loading')
  const [game, setGame] = useState({
    player: { ...fallbackLevel.player, direction: 'right' },
    enemies: fallbackLevel.enemies.map((enemy) => ({ ...enemy })),
    lives: INITIAL_LIVES, time: fallbackLevel.timeLimit, hasKey: false, startedAt: 0,
  })
  const [attackCell, setAttackCell] = useState(null)
  const [attackVisible, setAttackVisible] = useState(false)

  const gameRef = useRef(game)
  const endedRef = useRef(false)
  const moveCooldownRef = useRef(0)
  const enemyTimerRef = useRef(0)
  const damageCooldownRef = useRef(0)
  const attackTimerRef = useRef(null)
  const alias = sessionStorage.getItem('playerAlias') || 'Ashen'

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      endedRef.current = false
      const result = await getLevel(levelParam)
      if (!active) return
      const nextLevel = result.data || fallbackLevel
      const nextGame = {
        player: { ...nextLevel.player, direction: 'right' },
        enemies: nextLevel.enemies.map((enemy) => ({ ...enemy })),
        lives: INITIAL_LIVES, time: nextLevel.timeLimit, hasKey: false, startedAt: performance.now(),
      }
      setLevel(nextLevel)
      setApiSource(result.source)
      gameRef.current = nextGame
      setGame(nextGame)
      moveCooldownRef.current = 0
      enemyTimerRef.current = 0
      damageCooldownRef.current = 0
      setLoading(false)
    }
    load()
    return () => { active = false; window.clearTimeout(attackTimerRef.current) }
  }, [levelParam])

  const wallSet = useMemo(() => new Set(level.walls.map(cellId)), [level])

  const updateGame = useCallback((updater) => {
    setGame((previous) => {
      const next = typeof updater === 'function' ? updater(previous) : updater
      gameRef.current = next
      return next
    })
  }, [])

  const finish = useCallback((result) => {
    if (endedRef.current) return
    endedRef.current = true
    const current = gameRef.current
    const defeated = level.enemies.length - current.enemies.length
    const damage = INITIAL_LIVES - current.lives
    const run = {
      runId: crypto.randomUUID(),
      alias,
      score: calculateScore(current.time, defeated, damage),
      time: current.time,
      result,
      enemiesDefeated: defeated,
      damage,
      completedAt: new Date().toISOString(),
      levelId: level.id,
    }
    sessionStorage.setItem('run-' + run.runId, JSON.stringify(run))
    navigate('/results/' + run.runId)
  }, [alias, level, navigate])

  const damage = useCallback(() => {
    const now = performance.now()
    if (now < damageCooldownRef.current) return
    damageCooldownRef.current = now + 900
    updateGame((previous) => ({ ...previous, lives: Math.max(0, previous.lives - 1) }))
  }, [updateGame])

  const movePlayer = useCallback((direction) => {
    if (endedRef.current || loading) return
    const current = gameRef.current
    const next = moveCell(current.player, direction)
    if (!canEnterCell(next, level, wallSet)) {
      updateGame((previous) => ({ ...previous, player: { ...previous.player, direction } }))
      return
    }
    if (current.enemies.some((enemy) => sameCell(enemy, next))) {
      updateGame((previous) => ({ ...previous, player: { ...previous.player, direction } }))
      damage()
      return
    }
    updateGame((previous) => ({
      ...previous,
      player: { ...next, direction },
      hasKey: previous.hasKey || sameCell(next, level.key),
    }))
  }, [damage, level, loading, updateGame, wallSet])

  const attack = useCallback(() => {
    if (endedRef.current || loading) return
    const current = gameRef.current
    const target = getAdjacentCell(current.player, current.player.direction)
    setAttackCell(target)
    setAttackVisible(true)
    window.clearTimeout(attackTimerRef.current)
    attackTimerRef.current = window.setTimeout(() => setAttackVisible(false), 130)
    if (current.enemies.some((enemy) => sameCell(enemy, target))) {
      updateGame((previous) => ({
        ...previous,
        enemies: previous.enemies.filter((enemy) => !sameCell(enemy, target)),
      }))
    }
  }, [loading, updateGame])

  const tick = useCallback((delta) => {
    if (loading || endedRef.current) return
    const current = gameRef.current
    const nextTime = Math.max(0, current.time - delta)

    if (Math.floor(nextTime) !== current.time) {
      updateGame((previous) => ({ ...previous, time: Math.floor(nextTime) }))
    }
    if (nextTime <= 0) {
      finish('defeat')
      return
    }

    const pressed = consumePressed()
    if (pressed.has(' ')) attack()

    moveCooldownRef.current -= delta
    const directionKey = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright']
      .find((key) => keysRef.current.has(key))

    if (directionKey && moveCooldownRef.current <= 0) {
      movePlayer(KEY_TO_DIRECTION[directionKey])
      moveCooldownRef.current = 0.13
    }

    enemyTimerRef.current -= delta
    if (enemyTimerRef.current <= 0) {
      enemyTimerRef.current = 0.72
      const state = gameRef.current
      const result = moveEnemies(state.enemies, state.player, level, wallSet)
      if (result.playerHit) damage()
      updateGame((previous) => ({ ...previous, enemies: result.enemies }))
    }

    const fresh = gameRef.current
    if (fresh.lives <= 0) {
      finish('defeat')
      return
    }
    if (fresh.hasKey && fresh.enemies.length === 0 && sameCell(fresh.player, level.exit)) {
      finish('victory')
    }
  }, [attack, consumePressed, damage, finish, keysRef, level, loading, movePlayer, updateGame, wallSet])

  useGameLoop(!loading, tick)

  if (loading) {
    return <main className="screen center"><section className="panel"><p className="eyebrow">LEVEL 01</p><h1>Opening the crypt...</h1></section></main>
  }

  const unlocked = game.hasKey && game.enemies.length === 0

  return <main className="screen game-screen">
    {apiSource === 'fallback' && <div className="api-notice">JSON Server no está activo. El nivel local permite jugar igualmente.</div>}
    <HUD alias={alias} lives={game.lives} time={game.time} enemies={game.enemies.length} hasKey={game.hasKey} />
    <section className="play-layout">
      <div>
        <GameBoard level={level} player={game.player} enemies={game.enemies} hasKey={game.hasKey} attackCell={attackCell} attackVisible={attackVisible} />
        <div className="combat-bar"><span>{unlocked ? 'THE EXIT IS OPEN' : game.hasKey ? 'CLEAR THE ROOM' : 'FIND THE ASHEN KEY'}</span><span>FACING: {game.player.direction.toUpperCase()}</span></div>
        <GameControls onMove={movePlayer} onAttack={attack} />
      </div>
      <aside className="game-sidebar">
        <section className="side-card"><p className="eyebrow">OBJECTIVE</p><div className="objective-step"><span>01</span><strong>Defeat guardians</strong><em>{3 - game.enemies.length}/3</em></div><div className={'objective-step ' + (game.hasKey ? 'is-done' : '')}><span>02</span><strong>Collect the key</strong><em>{game.hasKey ? 'DONE' : 'OPEN'}</em></div><div className={'objective-step ' + (unlocked ? 'is-done' : '')}><span>03</span><strong>Reach the exit</strong><em>{unlocked ? 'READY' : 'LOCKED'}</em></div></section>
        <section className="side-card"><p className="eyebrow">CONTROLS</p><p><kbd>W A S D</kbd> Move</p><p><kbd>SPACE</kbd> Attack</p></section>
      </aside>
    </section>
  </main>
}