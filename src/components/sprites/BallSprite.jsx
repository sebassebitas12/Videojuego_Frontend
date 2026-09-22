import React from 'react'

/**
 * Componente BallSprite: Renderiza Poké Balls coleccionables en 3D brillante
 * Soporta Poké Ball (Ruta 01), Great Ball / Super Ball (Bosque Verde) y Ultra Ball (Monte Moon).
 */
export default function BallSprite({ type = 'pokeball' }) {
  // Configuración de colores según la clase de Poké Ball
  const isGreat = type === 'greatball'
  const isUltra = type === 'ultraball'

  return (
    <div className={`pokeball-item ball-${type}`} aria-label="Poké Ball coleccionable">
      <svg viewBox="0 0 28 28" className="ball-svg" width="100%" height="100%">
        <defs>
          <radialGradient id="ballShine" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pokeRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="greatBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="ultraBlack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="pokeWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Sombra de suelo */}
        <ellipse cx="14" cy="26" rx="9" ry="2" fill="rgba(0, 0, 0, 0.35)" />

        {/* Círculo base con borde oscuro */}
        <circle cx="14" cy="13" r="11" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />

        {/* Mitad superior */}
        <path
          d="M 3 13 A 11 11 0 0 1 25 13 Z"
          fill={isUltra ? 'url(#ultraBlack)' : isGreat ? 'url(#greatBlue)' : 'url(#pokeRed)'}
        />

        {/* Detalles específicos de Great Ball (marcas rojas) */}
        {isGreat && (
          <>
            <path d="M 6 10 C 8 6, 11 5, 12 7 L 11 12 Z" fill="#ef4444" />
            <path d="M 22 10 C 20 6, 17 5, 16 7 L 17 12 Z" fill="#ef4444" />
          </>
        )}

        {/* Detalles específicos de Ultra Ball (rayas amarillas en 'H') */}
        {isUltra && (
          <>
            <path d="M 8 5 L 11 7 L 11 12 L 8 12 Z" fill="#eab308" />
            <path d="M 20 5 L 17 7 L 17 12 L 20 12 Z" fill="#eab308" />
            <rect x="11" y="6" width="6" height="2.5" fill="#eab308" />
          </>
        )}

        {/* Mitad inferior blanca */}
        <path d="M 3 13 A 11 11 0 0 0 25 13 Z" fill="url(#pokeWhite)" />

        {/* Banda negra central */}
        <rect x="3" y="11.5" width="22" height="3" fill="#0f172a" />

        {/* Botón exterior central */}
        <circle cx="14" cy="13" r="4.2" fill="#0f172a" />
        <circle cx="14" cy="13" r="3.2" fill="url(#pokeWhite)" stroke="#0f172a" strokeWidth="0.8" />

        {/* Botón pulsante central con brillo */}
        <circle cx="14" cy="13" r="1.5" fill="#ffffff" className="ball-led" />

        {/* Brillo especular esférico */}
        <circle cx="14" cy="13" r="10.5" fill="url(#ballShine)" pointerEvents="none" />
      </svg>
    </div>
  )
}
