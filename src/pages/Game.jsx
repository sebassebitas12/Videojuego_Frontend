import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import GameControls from '../components/GameControls'
import HUD from '../components/HUD'
import { fallbackLevel } from '../data/fallbackLevel'
import useGameLoop from '../hooks/useGameLoop'
import useKeyboard from '../hooks/useKeyboard'
import { getLevel } from '../services/api'
import { KEY_TO_DIRECTION, canEnterCell, calculateScore, cellId, getAdjacentCell, moveCell, sameCell } from '../utils/game'

const INITIAL_LIVES = 3
const MOVE_INTERVAL = 0.14
const ATTACK_DURATION = 0.16
const DAMAGE_COOLDOWN = 1

function createGame(level) {
  return {
    player: { ...level.player, direction: 'right' },
    enemies: level.enemies.map((enemy) => ({ ...enemy })),
    lives: INITIAL_LIVES,
    time: level.timeLimit,
    hasKey: false,
  }
}

export default function Game() {
  const { level: levelParam } = useParams()
  const navigate = useNavigate()
  const { keysRef, consumePressed } = useKeyboard()

  const [level, setLevel] = useState(fallbackLevel)
  const [loading, setLoading] = useState(true)
  const [apiSource, setApiSource] = useState('loading')
  const [game, setGame] = useState(() => createGame(fallbackLevel))
  const [attackCell, setAttackCell] = useState(null)
  const [attackVisible, setAttackVisible] = useState(false)

  const gameRef = useRef(game)
  const endedRef = useRef(false)
  const moveTimerRef = useRef(0)
  const damageTimerRef = useRef(0)
  const attackTimerRef = useRef(null)

  const alias = sessionStorage.getItem('playerAlias') || 'Ashen'
  const wallSet = useMemo(() => new Set(level.walls.map(cellId)), [level])

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      endedRef.current = false

      const result = await getLevel(levelParam)
      if (!active) return

      const nextLevel = result.data || fallbackLevel
      const nextGame = createGame(nextLevel)

      setLevel(nextLevel)
      setApiSource(result.source)
      gameRef.current = nextGame
      setGame(nextGame)
      moveTimerRef.current = 0
      damageTimerRef.current = 0
   	  setLoading(false)
    }

    load()

    return () => {
      active = false
      window.clearTimeout(attackTimerRef.current)
    }
  }, [levelParam])

  const updateGame = useCallback((updater) => {
    const previous = gameRef.current
    const next = typeof updater === 'function' ? updater(previous) : updater
    gameRef.current = next
    setGame(next)
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

  const receiveDamage = useCallback(() => {
    if (damageTimerRef.current > 0) return

    damageTimerRef.current = DAMAGE_COOLDOWN

    updateGame((previous) => ({
      ...previous,
      lives: Math.max(0, previous.lives - 1),
    }))
  }, [updateGame])

  const movePlayer = useCallback((direction) => {
    if (endedRef.current || loading) return

    const current = gameRef.current
    const next = moveCell(current.player, direction)

    if (!canEnterCell(next, level, wallSet)) {
      updateGame((previous) => ({
        ...previous,
        player: { ...previous.player, direction },
      }))
      return
    }

    if (current.enemies.some((enemy) => sameCell(enemy, next))) {
      updateGame((previous) => ({
        ...previous,
        player: { ...previous.player, direction },
      }))
      receiveDamage()
      return
    }

    updateGame((previous) => ({
      ...previous,
      player: { ...next, direction },
      hasKey: previous.hasKey || sameCell(next, level.key),
    }))
  }, [level, loading, receiveDamage, updateGame, wallSet])

  const attack = useCallback(() => {
    if (endedRef.current || loading) return

    const current = gameRef.current
    const target = getAdjacentCell(current.player, current.player.direction)

    setAttackCell(target)
    setAttackVisible(true)

    window.clearTimeout(attackTimerRef.current)
    attackTimerRef.current = window.setTimeout(() => {
      setAttackVisible(false)
    }, ATTACK_DURATION * 1000)

    if (!current.enemies.some((enemy) => sameCell(enemy, target))) return

    updateGame((previous) => ({
      ...previous,
      enemies: previous.enemies.filter((enemy) => !sameCell(enemy, target)),
    }))
  }, [loading, updateGame])

  const tick = useCallback((delta) => {
    if (loading || endedRef.current) return

    damageTimerRef.current = Math.max(0, damageTimerRef.current - delta)

    const current = gameRef.current
    const nextTime = Math.max(0, current.time - delta)

    if (Math.floor(nextTime) !== current.time) {
      updateGame((previous) => ({
        ...previous,
        time: Math.floor(nextTime),
      }))
    }

    if (nextTime <= 0) {
      finish('defeat')
      return
    }

    const pressed = consumePressed()
    if (pressed.has(' ')) {
      attack()
    }

    moveTimerRef.current -= delta

    const directionKey = [
      'w',
      'a',
      's',
      'd',
      'arrowup',
      'arrowleft',
      'arrowdown',
      'arrowright',
    ].find((key) => keysRef.current.has(key))

    if (directionKey && moveTimerRef.current <= 0) {
      movePlayer(KEY_TO_DIRECTION[directionKey])
      moveTimerRef.current = MOVE_INTERVAL
    }

    const fresh = gameRef.current

    if (fresh.lives <= 0) {
      finish('defeat')
      return
    }

    if (
      fresh.enemies.length === 0 &&
      fresh.hasKey &&
      sameCell(fresh.player, level.exit)
    ) {
      finish('victory')
    }
  }, [
    attack,
    consumePressed,
    finish,
    keysRef,
    level,
    loading,
    movePlayer,
    updateGame,
  ])

  useGameLoop(!loading, tick)

  if (loading) {
    return (
      <main className="screen center">
        <section className="panel">
          <p className="eyebrow">LEVEL 01</p>
          <h1>Opening the crypt...</h1>
          <p className="muted">Preparando la sala de combate.</p>
        </section>
      </main>
    )
  }

  const unlocked = game.hasKey && game.enemies.length === 0

  return (
    <main className="screen game-screen">
      {apiSource === 'fallback' && (
        <div className="api-notice">
          JSON Server no está activo. El nivel local permite jugar igualmente.
        </div>
      )}

      <HUD
        alias={alias}
        lives={game.lives}
        time={game.time}
        enemies={game.enemies.length}
        hasKey={game.hasKey}
      />

      <section className="play-layout">
        <div>
          <GameBoard
            level={level}
            player={game.player}
            enemies={game.enemies}
            hasKey={game.hasKey}
            attackCell={attackCell}
            attackVisible={attackVisible}
          />

          <div className="combat-bar">
            <span>
              {unlocked
                ? 'THE EXIT IS OPEN'
                : game.enemies.length > 0
                  ? 'DEFEAT THE GUARDIANS'
                  : game.hasKey
                    ? 'REACH THE EXIT'
                    : 'FIND THE ASHEN KEY'}
            </span>
            <span>FACING: {game.player.direction.toUpperCase()}</span>
          </div>

          <GameControls onMove={movePlayer} onAttack={attack} />
        </div>

        <aside className="game-sidebar">
          <section className="side-card">
            <p className="eyebrow">OBJECTIVE</p>

            <div className="objective-step">
              <span>01</span>
              <strong>Defeat guardians</strong>
              <em>{level.enemies.length - game.enemies.length}/{level.enemies.length}</em>
            </div>

            <div className={'objective-step ' + (game.hasKey ? 'is-done' : '')}>
              <span>02</span>
              <strong>Collect the key</strong>
              <em>{game.hasKey ? 'DONE' : 'OPEN'}</em>
            </div>

            <div className={'objective-step ' + (unlocked ? 'is-done' : '')}>
              <span>03</span>
              <strong>Reach the exit</strong>
              <em>{unlocked ? 'READY' : 'LOCKED'}</em>
            </div>
          </section>

          <section className="side-card">
            <p className="eyebrow">CONTROLS</p>
            <p><kbd>W A S D</kbd> Move</p>
            <p><kbd>SPACE</kbd> Attack</p>
          </section>

          <section className="side-card">
            <p className="eyebrow">COMBAT</p>
            <p>Los guardianes permanecen en su posición hasta que los derrotes.</p>
            <p>Chocar con uno resta una vida.</p>
          </section>
        </aside>
      </section>
    </main>
  )
}
