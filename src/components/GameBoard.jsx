import React, { useMemo } from 'react'
import TrainerSprite from './sprites/TrainerSprite'
import PokemonSprite from './sprites/PokemonSprite'
import BallSprite from './sprites/BallSprite'
import GoalFlag from './sprites/GoalFlag'

const CAMERA_WIDTH = 960

/**
 * Componente GameBoard: Renderiza el mundo 2D con un sistema de coordenadas
 * proporcional estricto para que las colisiones, pies y plataformas coincidan al 100%.
 */
export default function GameBoard({ level, player, enemies, collectibles, cameraX }) {
  // Conversión exacta en porcentaje de la resolución virtual del nivel
  const xPercent = (value) => (value / level.width) * 100 + '%'
  const yPercent = (value) => (value / level.height) * 100 + '%'
  const sceneWidth = (level.width / CAMERA_WIDTH) * 100 + '%'
  const cameraOffset = -(cameraX / level.width) * 100 + '%'
  const theme = level.theme || 'route1'
  const isGoalUnlocked = collectibles.length === 0

  // Decoraciones del fondo generadas con posiciones relativas exactas
  const sceneryProps = useMemo(() => {
    return {
      clouds: [
        { id: 'c1', left: 4, top: 8, w: 90, h: 32, speed: 'slow' },
        { id: 'c2', left: 20, top: 16, w: 70, h: 26, speed: 'med' },
        { id: 'c3', left: 38, top: 6, w: 110, h: 36, speed: 'slow' },
        { id: 'c4', left: 56, top: 14, w: 80, h: 28, speed: 'med' },
        { id: 'c5', left: 74, top: 9, w: 100, h: 34, speed: 'slow' },
        { id: 'c6', left: 90, top: 18, w: 65, h: 24, speed: 'fast' },
      ],
      trees: [
        { id: 't1', x: 2.5, y: 330, type: 'oak' },
        { id: 't2', x: 9.0, y: 340, type: 'pine' },
        { id: 't3', x: 19.5, y: 330, type: 'oak' },
        { id: 't4', x: 30.0, y: 320, type: 'oak' },
        { id: 't5', x: 44.0, y: 335, type: 'pine' },
        { id: 't6', x: 55.0, y: 320, type: 'oak' },
        { id: 't7', x: 67.0, y: 330, type: 'pine' },
        { id: 't8', x: 79.0, y: 325, type: 'oak' },
        { id: 't9', x: 91.0, y: 335, type: 'oak' },
      ],
      fences: [
        { id: 'f1', x: 6.0, y: 442 },
        { id: 'f2', x: 23.0, y: 442 },
        { id: 'f3', x: 48.0, y: 442 },
        { id: 'f4', x: 71.0, y: 442 },
        { id: 'f5', x: 86.0, y: 442 },
      ],
      flowers: [
        { id: 'fl1', x: 4.0, y: 462, color: 'red' },
        { id: 'fl2', x: 12.0, y: 462, color: 'yellow' },
        { id: 'fl3', x: 27.0, y: 462, color: 'blue' },
        { id: 'fl4', x: 36.0, y: 462, color: 'red' },
        { id: 'fl5', x: 52.0, y: 462, color: 'yellow' },
        { id: 'fl6', x: 64.0, y: 462, color: 'blue' },
        { id: 'fl7', x: 82.0, y: 462, color: 'red' },
      ],
    }
  }, [])

  return (
    <div className={`platform-wrap theme-${theme}`}>
      {/* Barra superior de estado */}
      <div className="platform-meta">
        <span className="route-badge">NIVEL 0{level.id}</span>
        <strong>{level.name}</strong>
        <span className={`status-badge ${isGoalUnlocked ? 'status-unlocked' : ''}`}>
          {isGoalUnlocked ? '🏁 ¡META DESBLOQUEADA!' : `RECOGE ${collectibles.length} POKÉ BALLS`}
        </span>
      </div>

      {/* Ventana de juego con cámara 16:9 */}
      <div className="platform-world">
        <div
          className={`platform-scene scene-${theme}`}
          style={{ width: sceneWidth, transform: `translate3d(${cameraOffset}, 0, 0)` }}
        >
          {/* =========================================================
              FONDO 1: CIELO Y MONTAÑAS LEJANAS
              ========================================================= */}
          <div className="bg-sky-layer">
            {theme === 'route1' && (
              <>
                <div className="sky-gradient-route1" />
                <div className="distant-mountain-range" />
                <div className="clouds-container">
                  {sceneryProps.clouds.map((c) => (
                    <div
                      key={c.id}
                      className={`cloud-sprite cloud-${c.speed}`}
                      style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.w}px`, height: `${c.h}px` }}
                    />
                  ))}
                </div>
              </>
            )}

            {theme === 'forest' && (
              <>
                <div className="forest-sky-canopy" />
                <div className="forest-background-trees" />
                <div className="forest-light-shafts" />
              </>
            )}

            {theme === 'cave' && (
              <>
                <div className="cave-rock-backdrop" />
                <div className="cave-stalactites-top" />
                <div className="moon-light-ambiance" />
              </>
            )}
          </div>

          {/* =========================================================
              FONDO 2: ELEMENTOS DECORATIVOS (Árboles, Vallas, Flores)
              ========================================================= */}
          <div className="scenery-layer">
            {theme === 'route1' && (
              <>
                {/* Árboles Pokémon clásicos */}
                {sceneryProps.trees.map((t) => (
                  <div
                    key={t.id}
                    className={`pokemon-scenery-tree tree-${t.type}`}
                    style={{ left: `${t.x}%`, top: yPercent(t.y) }}
                  />
                ))}

                {/* Vallas de madera */}
                {sceneryProps.fences.map((f) => (
                  <div
                    key={f.id}
                    className="pokemon-wooden-fence"
                    style={{ left: `${f.x}%`, top: yPercent(f.y) }}
                  />
                ))}

                {/* Flores de la ruta */}
                {sceneryProps.flowers.map((fl) => (
                  <div
                    key={fl.id}
                    className={`pokemon-flower flower-${fl.color}`}
                    style={{ left: `${fl.x}%`, top: yPercent(fl.y) }}
                  />
                ))}

                {/* Cartel de ruta en el inicio */}
                <div className="route-wooden-sign" style={{ left: '4.5%', top: yPercent(426) }}>
                  <span>RUTA 1</span>
                </div>
              </>
            )}

            {theme === 'forest' && (
              <>
                <div className="forest-giant-trunks-layer" />
                <div className="forest-ambient-glows">
                  <span className="firefly f1" style={{ left: '12%', top: '35%' }} />
                  <span className="firefly f2" style={{ left: '28%', top: '22%' }} />
                  <span className="firefly f3" style={{ left: '46%', top: '42%' }} />
                  <span className="firefly f4" style={{ left: '65%', top: '28%' }} />
                  <span className="firefly f5" style={{ left: '83%', top: '38%' }} />
                </div>
              </>
            )}

            {theme === 'cave' && (
              <div className="cave-crystals-scenery">
                <div className="moon-crystal mc1" style={{ left: '11%', top: yPercent(220) }} />
                <div className="moon-crystal mc2" style={{ left: '32%', top: yPercent(180) }} />
                <div className="moon-crystal mc3" style={{ left: '54%', top: yPercent(240) }} />
                <div className="moon-crystal mc4" style={{ left: '73%', top: yPercent(190) }} />
                <div className="moon-crystal mc5" style={{ left: '89%', top: yPercent(230) }} />
              </div>
            )}
          </div>

          {/* =========================================================
              CAPA 3: PLATAFORMAS (Con texturas y medidas exactas)
              ========================================================= */}
          {level.platforms.map((platform, index) => (
            <div
              key={`platform-${index}`}
              className={`game-platform platform-${platform.type || 'grass'}`}
              style={{
                left: xPercent(platform.x),
                top: yPercent(platform.y),
                width: xPercent(platform.width),
                height: yPercent(platform.height),
              }}
            >
              <div className="platform-grass-edge" />
              <div className="platform-dirt-body" />
            </div>
          ))}

          {/* =========================================================
              CAPA 4: POKÉ BALLS (Posicionamiento proporcional)
              ========================================================= */}
          {collectibles.map((item) => (
            <div
              key={item.id}
              className="game-entity collectible-entity"
              style={{
                left: xPercent(item.x),
                top: yPercent(item.y),
                width: xPercent(item.width || 28),
                height: yPercent(item.height || 28),
              }}
            >
              <BallSprite type={item.type || level.ballType || 'pokeball'} />
            </div>
          ))}

          {/* =========================================================
              CAPA 5: POKÉMON SALVAJES (Pies apoyados exactamente en la plataforma)
              ========================================================= */}
          {enemies.map((enemy) => (
            <div
              key={enemy.id}
              className={`game-entity enemy-entity ${enemy.isFlying ? 'is-flying' : ''}`}
              style={{
                left: xPercent(enemy.x),
                top: yPercent(enemy.y),
                width: xPercent(enemy.width || 44),
                height: yPercent(enemy.height || 32),
              }}
            >
              <PokemonSprite
                type={enemy.type || 'rattata'}
                direction={enemy.direction}
                isDefeated={enemy.isDefeated}
              />
            </div>
          ))}

          {/* =========================================================
              CAPA 6: META (Bandera oficial de Gimnasio Pokémon)
              ========================================================= */}
          <div
            className="game-entity goal-entity"
            style={{
              left: xPercent(level.goal.x),
              top: yPercent(level.goal.y),
              width: xPercent(level.goal.width || 46),
              height: yPercent(level.goal.height || 70),
            }}
          >
            <GoalFlag isUnlocked={isGoalUnlocked} />
          </div>

          {/* =========================================================
              CAPA 7: JUGADOR (Entrenador Ash Ketchum / Red)
              ========================================================= */}
          <div
            className="game-entity player-entity"
            style={{
              left: xPercent(player.x),
              top: yPercent(player.y),
              width: xPercent(player.width || 36),
              height: yPercent(player.height || 48),
            }}
          >
            <TrainerSprite
              direction={player.direction}
              isMoving={Math.abs(player.vx) > 10}
              isJumping={!player.grounded}
              isHurt={player.isHurt}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
