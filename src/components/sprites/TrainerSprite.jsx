import React from 'react'

/**
 * Componente TrainerSprite: Renderiza al Entrenador Pokémon (Red / Ash Ketchum)
 * con gorra oficial de la Liga Añil, chaqueta, mochila y animaciones de carrera y salto.
 */
export default function TrainerSprite({ direction = 'right', isMoving = false, isJumping = false, isHurt = false }) {
  return (
    <div
      className={`trainer-character ${direction === 'left' ? 'facing-left' : 'facing-right'} ${isMoving ? 'is-running' : 'is-idle'} ${isJumping ? 'is-jumping' : ''} ${isHurt ? 'is-hurt' : ''}`}
      aria-label="Entrenador Pokémon"
    >
      <svg viewBox="0 0 40 46" className="trainer-svg" width="100%" height="100%">
        <defs>
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#c71b1b" />
          </linearGradient>
          <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e53935" />
            <stop offset="100%" stopColor="#b71c1c" />
          </linearGradient>
          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#212121" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffdbac" />
            <stop offset="100%" stopColor="#f1c27d" />
          </linearGradient>
          <linearGradient id="jeansGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3c72" />
            <stop offset="100%" stopColor="#152642" />
          </linearGradient>
        </defs>

        {/* Sombra de suelo */}
        <ellipse cx="20" cy="44" rx="13" ry="2.5" fill="rgba(0, 0, 0, 0.35)" />

        {/* Mochila de viajero */}
        <g className="trainer-backpack">
          <rect x="5" y="19" width="7" height="13" rx="3" fill="#2e7d32" stroke="#1b5e20" strokeWidth="1" />
          <rect x="5.5" y="24" width="6" height="2" fill="#ffb300" />
        </g>

        {/* Pierna trasera (izquierda) */}
        <g className="leg leg-left">
          <rect x="13" y="29" width="5.5" height="10" rx="2" fill="url(#jeansGrad)" stroke="#0d1b2a" strokeWidth="0.8" />
          {/* Zapato */}
          <path d="M 12 39 L 19 39 L 19 43 L 11 43 Z" fill="#ffffff" stroke="#c71b1b" strokeWidth="1" />
          <rect x="11" y="42" width="8" height="1.5" fill="#c71b1b" />
        </g>

        {/* Pierna delantera (derecha) */}
        <g className="leg leg-right">
          <rect x="21" y="29" width="5.5" height="10" rx="2" fill="url(#jeansGrad)" stroke="#0d1b2a" strokeWidth="0.8" />
          {/* Zapato */}
          <path d="M 21 39 L 28 39 L 29 43 L 20 43 Z" fill="#ffffff" stroke="#c71b1b" strokeWidth="1" />
          <rect x="20" y="42" width="9" height="1.5" fill="#c71b1b" />
        </g>

        {/* Torso / Chaqueta roja de Ash/Red con camiseta interior */}
        <g className="torso">
          {/* Chaqueta base */}
          <rect x="12" y="17" width="16" height="13" rx="3" fill="url(#jacketGrad)" stroke="#8e0000" strokeWidth="0.8" />
          {/* Camiseta interior negra */}
          <polygon points="17,17 23,17 22,25 18,25" fill="url(#shirtGrad)" />
          {/* Cuello de la camiseta */}
          <path d="M 16 17 Q 20 20 24 17" stroke="#ffffff" strokeWidth="1" fill="none" />
          {/* Cinturón */}
          <rect x="12" y="28" width="16" height="2.5" fill="#212121" />
          <rect x="18" y="28" width="4" height="2.5" fill="#ffd700" />
        </g>

        {/* Brazo y mano */}
        <g className="arm">
          <path d="M 24 18 L 28 25 L 25 26 L 22 20 Z" fill="#e53935" />
          {/* Manga blanca */}
          <rect x="24" y="22" width="4" height="2" fill="#ffffff" rx="1" />
          {/* Guantelete verde con dedos descubiertos */}
          <circle cx="27" cy="27" r="2.5" fill="#2e7d32" />
          <circle cx="28" cy="28" r="1.2" fill="url(#skinGrad)" />
        </g>

        {/* Cabeza y Pelo */}
        <g className="head">
          {/* Pelo oscuro con picos clásicos de anime */}
          <path d="M 11 11 L 8 15 L 13 14 L 9 19 L 14 17 L 15 21 L 18 19 L 28 19 L 30 15 L 32 17 L 31 12 Z" fill="#2d1d13" />
          
          {/* Cara */}
          <rect x="14" y="9" width="13" height="10" rx="4" fill="url(#skinGrad)" />
          
          {/* Ojo grande estilo anime */}
          <ellipse cx="23" cy="13" rx="1.8" ry="2.3" fill="#1f2937" />
          <circle cx="23.6" cy="12.2" r="0.8" fill="#ffffff" />
          
          {/* Sonrisa audaz */}
          <path d="M 21 16 Q 23 17.5 25 16" stroke="#b45309" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          
          {/* Marca de la mejilla (rayitas clásicas de Ash) */}
          <path d="M 22 14.8 L 24 14.8" stroke="#f59e0b" strokeWidth="0.6" strokeLinecap="round" />
        </g>

        {/* Gorra Oficial de la Liga Añil */}
        <g className="cap">
          {/* Cúpula roja de la gorra */}
          <path d="M 11 10 C 11 4, 29 4, 29 10 Z" fill="url(#capGrad)" stroke="#b71c1c" strokeWidth="0.8" />
          
          {/* Frente blanca de la gorra */}
          <path d="M 15 10 C 15 5.5, 27 5.5, 27 10 Z" fill="#ffffff" />
          
          {/* Emblema de Poké Ball verde en la gorra */}
          <path d="M 19 8.5 A 2 2 0 0 1 23 8.5 Z" fill="#00897b" />
          <circle cx="21" cy="8.5" r="0.7" fill="#ffffff" />
          
          {/* Visera de la gorra */}
          <path d="M 18 10 L 32 10 Q 30 12.5 24 12 L 18 11 Z" fill="#ffffff" stroke="#e0e0e0" strokeWidth="0.6" />
        </g>
      </svg>
    </div>
  )
}
