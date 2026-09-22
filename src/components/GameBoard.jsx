import React, { useMemo } from 'react'
import TrainerSprite from './sprites/TrainerSprite'
import PokemonSprite from './sprites/PokemonSprite'
import BallSprite from './sprites/BallSprite'
import GoalFlag from './sprites/GoalFlag'

const CAMERA_WIDTH = 960

/**
 * Componente GameBoard: Renderiza el mundo 2D del juego con capas de fondo,
 * plataformas temáticas, coleccionables y sprites reales de Pokémon.
 * Cumple con el criterio 2.1 (Componentes reutilizables, props, renderizado de listas con keys únicas).
 */
export default function GameBoard({ level, player, enemies, collectibles, cameraX }) {
  const xPercent = (value) => (value / level.width) * 100 + '%'
  const yPercent = (value) => (value / level.height) * 100 + '%'
  const sceneWidth = (level.width / CAMERA_WIDTH) * 100 + '%'
  const cameraOffset = -(cameraX / level.width) * 100 + '%'
  const theme = level.theme || 'route1'
  const isGoalUnlocked = collectibles.length === 0

  // Nubes y elementos decorativos calculados de forma determinista y memoizados
  const decorativeClouds = useMemo(() => [
    { id: 'c1', left: 8, top: 12, size: 75, speed: 'slow' },
    { id: 'c2', left: 24, top: 22, size: 55, speed: 'med' },
    { id: 'c3', left: 42, top: 8, size: 90, speed: 'slow' },
    { id: 'c4', left: 60, top: 18, size: 65, speed: 'med' },
    { id: 'c5', left: 78, top: 10, size: 85, speed: 'slow' },
    { id: 'c6', left: 92, top: 20, size: 50, speed: 'fast' },
  ], [])

  const decorativeTrees = useMemo(() => [
    { id: 't1', x: 2, y: 360, size: 'large' },
    { id: 't2', x: 12, y: 370, size: 'medium' },
    { id: 't3', x: 28, y: 365, size: 'large' },
    { id: 't4', x: 45, y: 375, size: 'medium' },
    { id: 't5', x: 62, y: 360, size: 'large' },
    { id: 't6', x: 75, y: 370, size: 'small' },
    { id: 't7', x: 88, y: 365, size: 'large' },
  ], [])

  return (
    <div className={`platform-wrap theme-${theme}`}>
      {/* Barra superior de información de la ruta */}
      <div className="platform-meta">
        <span className="route-badge">NIVEL {level.id}</span>
        <strong>{level.name}</strong>
        <span className={`status-badge ${isGoalUnlocked ? 'status-unlocked' : ''}`}>
          {isGoalUnlocked ? '🏁 ¡META DESBLOQUEADA!' : `RECOGE ${collectibles.length} POKÉ BALLS`}
        </span>
      </div>

      {/* Ventana de juego con cámara móvil */}
      <div className="platform-world">
        <div
          className={`platform-scene scene-${theme}`}
          style={{ width: sceneWidth, transform: `translate3d(${cameraOffset}, 0, 0)` }}
        >
          {/* Capa 1: Cielo y Siluetas de Montañas lejanas */}
          <div className="bg-sky-layer">
            <div className="distant-mountains" />
            {theme === 'route1' && (
              <div className="clouds-layer">
                {decorativeClouds.map((cloud) => (
                  <div
                    key={cloud.id}
                    className={`floating-cloud cloud-${cloud.speed}`}
                    style={{ left: `${cloud.left}%`, top: `${cloud.top}%`, width: `${cloud.size}px` }}
                  />
                ))}
              </div>
            )}
            {theme === 'forest' && <div className="forest-sunbeams" />}
            {theme === 'cave' && <div className="cave-crystals-layer" />}
          </div>

          {/* Capa 2: Decoraciones de fondo (Árboles, flores, vallas) */}
          <div className="scenery-decorations">
            {theme === 'route1' &&
              decorativeTrees.map((tree) => (
                <div
                  key={tree.id}
                  className={`scenery-tree tree-${tree.size}`}
                  style={{ left: `${tree.x}%`, top: `${tree.y}px` }}
                />
              ))}

            {theme === 'forest' && (
              <>
                <div className="forest-spores" />
                <div className="forest-giant-trunks" />
              </>
            )}

            {theme === 'cave' && (
              <div className="cave-glow-crystals">
                <span className="crystal c1" style={{ left: '15%', top: '220px' }} />
                <span className="crystal c2" style={{ left: '42%', top: '180px' }} />
                <span className="crystal c3" style={{ left: '68%', top: '260px' }} />
                <span className="crystal c4" style={{ left: '85%', top: '190px' }} />
              </div>
            )}
          </div>

          {/* Capa 3: Plataformas del Nivel */}
          {level.platforms.map((platform, index) => (
            <div
              key={`platform-${index}`}
              className={`platform platform-${platform.type || 'grass'}`}
              style={{
                left: xPercent(platform.x),
                top: yPercent(platform.y),
                width: xPercent(platform.width),
                height: yPercent(platform.height),
              }}
            >
              <div className="platform-surface" />
              <div className="platform-dirt" />
            </div>
          ))}

          {/* Capa 4: Coleccionables (Poké Balls con brillo) */}
          {collectibles.map((item) => (
            <div
              key={item.id}
              className="game-entity collectible-entity"
              style={{
                left: xPercent(item.x),
                top: yPercent(item.y),
                width: '28px',
                height: '28px',
              }}
            >
              <BallSprite type={item.type || level.ballType || 'pokeball'} />
            </div>
          ))}

          {/* Capa 5: Pokémon Enemigos (Rattata, Pidgey, Zubat) */}
          {enemies.map((enemy) => (
            <div
              key={enemy.id}
              className={`game-entity enemy-entity ${enemy.isFlying ? 'is-flying' : ''}`}
              style={{
                left: xPercent(enemy.x),
                top: yPercent(enemy.y),
                width: enemy.width ? `${enemy.width}px` : '38px',
                height: enemy.height ? `${enemy.height}px` : '32px',
              }}
            >
              <PokemonSprite
                type={enemy.type || 'rattata'}
                direction={enemy.direction}
                isDefeated={enemy.isDefeated}
              />
            </div>
          ))}

          {/* Capa 6: Meta (Bandera oficial de Gimnasio Pokémon) */}
          <div
            className="game-entity goal-entity"
            style={{
              left: xPercent(level.goal.x),
              top: yPercent(level.goal.y),
              width: '44px',
              height: '68px',
            }}
          >
            <GoalFlag isUnlocked={isGoalUnlocked} />
          </div>

          {/* Capa 7: Jugador (Entrenador Red / Ash Ketchum) */}
          <div
            className="game-entity player-entity"
            style={{
              left: xPercent(player.x),
              top: yPercent(player.y),
              width: '38px',
              height: '44px',
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
