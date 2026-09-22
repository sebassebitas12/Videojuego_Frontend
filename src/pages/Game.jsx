import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import GameControls from '../components/GameControls'
import HUD from '../components/HUD'
import { fallbackLevels, fallbackLevel } from '../data/fallbackLevel'
import useGameLoop from '../hooks/useGameLoop'
import useKeyboard from '../hooks/useKeyboard'
import { getLevel } from '../services/api'

// Dimensiones de colisión calibradas exactamente con los sprites (virtual 540p)
const PLAYER_WIDTH = 36
const PLAYER_HEIGHT = 48
const MOVE_SPEED = 250
const JUMP_SPEED = -520
const GRAVITY = 1260
const CAMERA_WIDTH = 960

function createGame(level) {
  return {
    player: {
      ...level.player,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      vx: 0,
      vy: 0,
      direction: 'right',
      grounded: false,
      isHurt: false,
      hurtTimer: 0,
    },
    enemies: level.enemies.map((enemy) => ({
      ...enemy,
      width: enemy.width || (enemy.type === 'zubat' ? 46 : enemy.type === 'pidgey' ? 42 : 44),
      height: enemy.height || (enemy.type === 'zubat' ? 34 : enemy.type === 'pidgey' ? 36 : 32),
      initialY: enemy.y,
      flightTimer: Math.random() * 5,
    })),
    collectibles: level.collectibles.map((item) => ({
      ...item,
      width: item.width || 28,
      height: item.height || 28,
    })),
    lives: 3,
    time: level.timeLimit,
    cameraX: 0,
  }
}

function overlaps(first, second) {
  return (
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y
  )
}

export default function Game() {
  const { level: levelParam } = useParams()
  const navigate = useNavigate()
  const { keysRef, consumePressed, pressKey, releaseKey } = useKeyboard()

  const [level, setLevel] = useState(fallbackLevel)
  const [game, setGame] = useState(() => createGame(fallbackLevel))
  const [loading, setLoading] = useState(true)
  const [apiSource, setApiSource] = useState('loading')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const gameRef = useRef(game)
  const endedRef = useRef(false)

  useEffect(() => {
    let active = true
    const levelId = Number(levelParam) || 1

    getLevel(levelId).then((result) => {
      if (!active) return
      const nextLevel = result.data || fallbackLevels.find((l) => l.id === levelId) || fallbackLevel
      setLevel(nextLevel)
      setApiSource(result.source)
      const nextGame = createGame(nextLevel)
      gameRef.current = nextGame
      setGame(nextGame)
      endedRef.current = false
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [levelParam])

  const updateGame = useCallback((updater) => {
    const next = typeof updater === 'function' ? updater(gameRef.current) : updater
    gameRef.current = next
    setGame(next)
  }, [])

  const finish = useCallback(
    (result) => {
      if (endedRef.current) return
      endedRef.current = true
      const current = gameRef.current
      const collected = level.collectibles.length - current.collectibles.length
      const damage = 3 - current.lives

      const run = {
        runId: crypto.randomUUID(),
        alias: sessionStorage.getItem('playerAlias') || 'Ash Ketchum',
        score: Math.max(0, Math.round(current.time * 10 + collected * 150 - damage * 50)),
        time: Math.ceil(current.time),
        result,
        enemiesDefeated: level.enemies.length - current.enemies.length,
        damage,
        collectibles: collected,
        completedAt: new Date().toISOString(),
        levelId: level.id,
        levelName: level.name,
      }

      sessionStorage.setItem('run-' + run.runId, JSON.stringify(run))
      navigate('/results/' + run.runId)
    },
    [level, navigate]
  )

  const showFeedback = useCallback((msg) => {
    setFeedbackMsg(msg)
    window.clearTimeout(window.__fbTimeout)
    window.__fbTimeout = window.setTimeout(() => setFeedbackMsg(''), 1500)
  }, [])

  const tick = useCallback(
    (delta) => {
      if (loading || endedRef.current) return
      const current = gameRef.current
      const pressed = consumePressed()

      const left = keysRef.current.has('a') || keysRef.current.has('arrowleft')
      const right = keysRef.current.has('d') || keysRef.current.has('arrowright')
      const jump = pressed.has('w') || pressed.has('arrowup') || pressed.has(' ')

      const direction = left ? 'left' : right ? 'right' : current.player.direction
      const horizontal = left ? -MOVE_SPEED : right ? MOVE_SPEED : 0

      const hurtTimer = Math.max(0, current.player.hurtTimer - delta)
      const isHurt = hurtTimer > 0

      const player = {
        ...current.player,
        vx: horizontal,
        vy: current.player.vy + GRAVITY * delta,
        direction,
        hurtTimer,
        isHurt,
      }

      // Salto del jugador
      if (jump && current.player.grounded) {
        player.vy = JUMP_SPEED
      }

      // Movimiento horizontal con límites del mapa
      player.x = Math.max(0, Math.min(level.width - PLAYER_WIDTH, player.x + player.vx * delta))

      // Movimiento vertical y aterrizaje en plataformas
      const previousBottom = player.y + PLAYER_HEIGHT
      player.y += player.vy * delta
      player.grounded = false

      for (const platform of level.platforms) {
        const landing =
          player.vy >= 0 &&
          previousBottom <= platform.y + 6 &&
          player.y + PLAYER_HEIGHT >= platform.y &&
          player.x + PLAYER_WIDTH > platform.x &&
          player.x < platform.x + platform.width

        if (landing) {
          player.y = platform.y - PLAYER_HEIGHT
          player.vy = 0
          player.grounded = true
        }
      }

      let lives = current.lives
      const defeated = new Set()
      const playerBox = { ...player, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }

      // Movimiento e interacción de enemigos Pokémon
      const enemies = current.enemies
        .map((enemy) => {
          let nextX = enemy.x + enemy.direction * (enemy.isFlying ? 55 : 45) * delta
          const minX = enemy.minX || 100
          const maxX = enemy.maxX || level.width - 100

          let nextDirection = enemy.direction
          if (nextX <= minX) {
            nextX = minX
            nextDirection = 1
          } else if (nextX >= maxX) {
            nextX = maxX
            nextDirection = -1
          }

          let nextY = enemy.y
          let flightTimer = (enemy.flightTimer || 0) + delta
          if (enemy.isFlying) {
            nextY = enemy.initialY + Math.sin(flightTimer * 3.2) * 14
          }

          const nextEnemy = {
            ...enemy,
            x: nextX,
            y: nextY,
            direction: nextDirection,
            flightTimer,
          }

          // Detección de colisión con enemigos
          if (!isHurt && overlaps(playerBox, { ...nextEnemy, width: nextEnemy.width, height: nextEnemy.height })) {
            const hitFromAbove = player.vy > 0 && player.y + PLAYER_HEIGHT - nextEnemy.y < 22
            if (hitFromAbove) {
              defeated.add(enemy.id)
              player.vy = JUMP_SPEED * 0.6
              showFeedback(`¡${(enemy.type || 'Rattata').toUpperCase()} derrotado! +50 pts`)
            } else {
              lives -= 1
              player.hurtTimer = 1.2
              player.vy = -220
              player.vx = enemy.direction * 160
              showFeedback('¡Daño recibido! -1 Vida')
            }
          }

          return nextEnemy
        })
        .filter((enemy) => !defeated.has(enemy.id))

      // Recolección de Poké Balls
      let justCollected = false
      const collectibles = current.collectibles.filter((item) => {
        const hit = overlaps(playerBox, { ...item, width: 28, height: 28 })
        if (hit) justCollected = true
        return !hit
      })

      if (justCollected) {
        showFeedback('¡Poké Ball obtenida! 🔴')
      }

      const nextTime = Math.max(0, current.time - delta)
      const cameraX = Math.max(0, Math.min(level.width - CAMERA_WIDTH, player.x - CAMERA_WIDTH * 0.42))

      updateGame({
        ...current,
        player,
        enemies,
        collectibles,
        lives,
        time: nextTime,
        cameraX,
      })

      if (lives <= 0 || player.y > level.height + 60 || nextTime <= 0) {
        finish('defeat')
      } else if (player.x + PLAYER_WIDTH >= level.goal.x && collectibles.length === 0) {
        finish('victory')
      }
    },
    [consumePressed, finish, keysRef, level, loading, showFeedback, updateGame]
  )

  useGameLoop(!loading, tick)

  const collectedCount = useMemo(
    () => level.collectibles.length - game.collectibles.length,
    [level.collectibles.length, game.collectibles.length]
  )

  const isAllCollected = useMemo(
    () => game.collectibles.length === 0,
    [game.collectibles.length]
  )

  if (loading) {
    return (
      <main className="screen center">
        <section className="panel loading-panel">
          <div className="loading-pokeball" />
          <p className="eyebrow">CARGANDO RUTA</p>
          <h1>Preparando la expedición...</h1>
          <p className="muted">Cargando datos del mapa y posicionando entidades.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="screen game-screen platformer-screen">
      {apiSource === 'fallback' && (
        <div className="api-notice">
          ℹ️ Modo local activo: Jugando con la configuración integrada (JSON Server disponible con npm run server).
        </div>
      )}

      {feedbackMsg && <div className="game-toast-feedback">{feedbackMsg}</div>}

      <HUD
        alias={sessionStorage.getItem('playerAlias') || 'Ash Ketchum'}
        lives={game.lives}
        time={Math.ceil(game.time)}
        enemies={game.enemies.length}
        hasKey={isAllCollected}
      />

      <section className="platformer-layout">
        <div className="main-stage">
          <GameBoard
            level={level}
            player={game.player}
            enemies={game.enemies}
            collectibles={game.collectibles}
            cameraX={game.cameraX}
          />
          <GameControls
            onMove={(direction, active) => {
              const key = direction === 'left' ? 'a' : 'd'
              active ? pressKey(key) : releaseKey(key)
            }}
            onJump={() => pressKey('w')}
          />
        </div>

        <aside className="game-sidebar">
          <section className="side-card mission-card">
            <p className="eyebrow">MISIÓN ACTUAL</p>
            <h2>{level.name}</h2>
            <p className="mission-desc">
              {level.subtitle || 'Recoge todas las Poké Balls y llega a la meta para completar la ruta.'}
            </p>
            <div className="mission-progress-bar">
              <div
                className="mission-progress-fill"
                style={{ width: `${(collectedCount / level.collectibles.length) * 100}%` }}
              />
            </div>
            <div className="mission-count">
              <span>Poké Balls:</span> <strong>{collectedCount} / {level.collectibles.length}</strong>
            </div>
          </section>

          <section className="side-card controls-card">
            <p className="eyebrow">CONTROLES</p>
            <div className="control-item">
              <kbd>A</kbd> <kbd>D</kbd> <span>Correr</span>
            </div>
            <div className="control-item">
              <kbd>W</kbd> / <kbd>ESPACIO</kbd> <span>Saltar</span>
            </div>
            <p className="tip-text">💡 <em>Salta sobre los Rattata para derrotarlos.</em></p>
          </section>

          <section className="side-card status-card">
            <p className="eyebrow">ESTADO</p>
            <p>🐾 {game.enemies.length} Pokémon salvajes patrullando</p>
            <p>🏃 {game.player.grounded ? 'En el suelo' : 'En el aire'}</p>
            <p>🏁 {isAllCollected ? '¡Bandera lista!' : 'Recolecta para abrir'}</p>
          </section>
        </aside>
      </section>
    </main>
  )
}
