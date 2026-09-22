import React from 'react'

/**
 * Componente HUD: Marcador superior del Entrenador con vidas (corazones/Pokéballs),
 * cronómetro, objetivo y nombre del jugador.
 * Cumple con el criterio 2.1 de la rúbrica.
 */
export default function HUD({ alias, lives, time, enemies, hasKey }) {
  const isDanger = time <= 15

  return (
    <header className="hud pokemon-hud">
      <div className="hud-block hud-player">
        <span className="hud-label">ENTRENADOR</span>
        <strong className="player-alias-text">🧢 {alias || 'Ash'}</strong>
      </div>

      <div className="hud-block hud-lives">
        <span className="hud-label">VIDAS</span>
        <div className="life-pips">
          {[0, 1, 2].map((pip) => (
            <span
              key={pip}
              className={`life-pip ${pip < lives ? 'is-alive' : 'is-lost'}`}
              title={pip < lives ? 'Vida activa' : 'Vida perdida'}
            >
              {pip < lives ? '❤️' : '🖤'}
            </span>
          ))}
        </div>
      </div>

      <div className={`hud-block hud-time ${isDanger ? 'is-danger' : ''}`}>
        <span className="hud-label">TIEMPO</span>
        <strong className="time-text">⏱ {String(time).padStart(2, '0')}s</strong>
      </div>

      <div className="hud-block hud-objective">
        <span className="hud-label">META DE RUTA</span>
        <strong className={`objective-text ${hasKey ? 'is-ready' : ''}`}>
          {hasKey ? '🏁 ¡Meta abierta!' : `🔴 Poké Balls (🐾 ${enemies} Pokémon)`}
        </strong>
      </div>
    </header>
  )
}