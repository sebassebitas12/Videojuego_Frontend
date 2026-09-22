import React from 'react'

/**
 * Componente TrainerSprite: Renderiza fielmente a Ash Ketchum / Red
 * con su icónica gorra de la Liga Añil, chaqueta roja y blanca, chaleco,
 * guantes verdes, cabello con picos y zapatillas de entrenador.
 */
export default function TrainerSprite({ direction = 'right', isMoving = false, isJumping = false, isHurt = false }) {
  return (
    <div
      className={`trainer-character ${direction === 'left' ? 'facing-left' : 'facing-right'} ${isMoving ? 'is-running' : 'is-idle'} ${isJumping ? 'is-jumping' : ''} ${isHurt ? 'is-hurt' : ''}`}
      aria-label="Entrenador Pokémon"
    >
      <svg viewBox="0 0 36 48" className="trainer-svg" width="100%" height="100%">
        <defs>
          <linearGradient id="trainerCapRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="trainerJacket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="trainerJeans" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="trainerSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
        </defs>

        {/* Sombra de suelo */}
        <ellipse cx="18" cy="46.5" rx="13" ry="2" fill="rgba(0, 0, 0, 0.4)" />

        {/* Mochila de viajero (verde con correas amarillas) */}
        <g className="trainer-backpack">
          <rect x="5" y="19" width="7" height="15" rx="3.5" fill="#15803d" stroke="#14532d" strokeWidth="1" />
          <rect x="5.5" y="24" width="6" height="3" rx="1" fill="#facc15" />
          <path d="M 8 19 Q 12 17 14 20" stroke="#166534" strokeWidth="1.2" fill="none" />
        </g>

        {/* Pierna trasera / izquierda */}
        <g className="leg leg-left">
          {/* Pantalón azul jean */}
          <rect x="11.5" y="29" width="5.5" height="12" rx="2" fill="url(#trainerJeans)" stroke="#172554" strokeWidth="0.8" />
          {/* Zapatilla deportiva blanca y roja */}
          <path d="M 10 41 L 18 41 L 18.5 45.5 L 9 45.5 Z" fill="#f8fafc" stroke="#b91c1c" strokeWidth="1" />
          <rect x="9.5" y="44" width="9" height="1.8" fill="#ef4444" rx="0.5" />
        </g>

        {/* Pierna delantera / derecha */}
        <g className="leg leg-right">
          {/* Pantalón azul jean */}
          <rect x="19" y="29" width="5.5" height="12" rx="2" fill="url(#trainerJeans)" stroke="#172554" strokeWidth="0.8" />
          {/* Zapatilla deportiva blanca y roja */}
          <path d="M 19 41 L 27 41 L 28 45.5 L 18 45.5 Z" fill="#f8fafc" stroke="#b91c1c" strokeWidth="1" />
          <rect x="18" y="44" width="10" height="1.8" fill="#ef4444" rx="0.5" />
        </g>

        {/* Torso: Chaqueta roja de Ash con mangas blancas y chaleco azul/negro */}
        <g className="torso">
          {/* Chaqueta base */}
          <rect x="11" y="17" width="15" height="13" rx="3" fill="url(#trainerJacket)" stroke="#7f1d1d" strokeWidth="0.8" />
          
          {/* Cuello blanco de la camisa */}
          <polygon points="15,17 22,17 21,21 16,21" fill="#ffffff" />
          <path d="M 14 17 L 18.5 22 L 23 17" stroke="#334155" strokeWidth="0.8" fill="none" />
          
          {/* Chaleco interior azul oscuro */}
          <path d="M 14 21 L 17 21 L 16.5 28 L 13.5 28 Z" fill="#1e293b" />
          <path d="M 20 21 L 23 21 L 23.5 28 L 20.5 28 Z" fill="#1e293b" />

          {/* Cinturón negro con hebilla dorada */}
          <rect x="11" y="27.5" width="15" height="2.5" fill="#0f172a" />
          <rect x="17" y="27" width="3.5" height="3.5" rx="0.8" fill="#facc15" stroke="#a16207" strokeWidth="0.5" />
        </g>

        {/* Brazo y Guante verde con dedos descubiertos */}
        <g className="arm">
          {/* Manga blanca corta */}
          <rect x="23" y="17.5" width="4.5" height="4" rx="1.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.6" />
          {/* Brazo piel */}
          <path d="M 24 21.5 L 27.5 26.5 L 25 27.5 L 22.5 22.5 Z" fill="url(#trainerSkin)" />
          {/* Guantelete verde con borde amarillo */}
          <circle cx="27" cy="27" r="2.8" fill="#16a34a" stroke="#14532d" strokeWidth="0.6" />
          <rect x="25.5" y="25.5" width="3" height="1" fill="#facc15" />
          {/* Dedos descubiertos */}
          <circle cx="28" cy="28.5" r="1.3" fill="url(#trainerSkin)" />
        </g>

        {/* Cabeza, Pelo Anime y Rostro */}
        <g className="head">
          {/* Pelo oscuro estilo picos de Ash */}
          <path d="M 10 11 L 7 15 L 12 14 L 8 19 L 13 17 L 14 21 L 17 19 L 28 19 L 30 15 L 32 17 L 31 12 Z" fill="#1c1917" />
          
          {/* Cara */}
          <rect x="13.5" y="8" width="13" height="11" rx="4" fill="url(#trainerSkin)" />
          
          {/* Ojo expresivo de anime */}
          <ellipse cx="22.5" cy="12.5" rx="2" ry="2.6" fill="#0f172a" />
          <circle cx="23.2" cy="11.5" r="0.9" fill="#ffffff" />
          <circle cx="22" cy="13.2" r="0.4" fill="#ffffff" />
          
          {/* Ceja decidida */}
          <path d="M 20.5 9.5 L 24.5 10.5" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Marca de la mejilla (rayitas de rayo de Ash) */}
          <path d="M 21.5 15 L 24 15 M 22 16 L 23.5 16" stroke="#ea580c" strokeWidth="0.7" strokeLinecap="round" />
          
          {/* Sonrisa audaz */}
          <path d="M 20 14.5 Q 22.5 16.5 24.5 14" stroke="#78350f" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        </g>

        {/* Gorra Oficial de la Liga Añil */}
        <g className="cap">
          {/* Domo rojo */}
          <path d="M 10 9 C 10 3, 28 3, 28 9 Z" fill="url(#trainerCapRed)" stroke="#991b1b" strokeWidth="0.8" />
          
          {/* Panel frontal blanco clásico */}
          <path d="M 14 9 C 14 4.5, 26 4.5, 26 9 Z" fill="#f8fafc" />
          
          {/* Logo verde de la Liga Pokémon de Kanto */}
          <path d="M 18.5 7.5 A 2 2 0 0 1 22.5 7.5 Z" fill="#059669" />
          <circle cx="20.5" cy="7.5" r="0.8" fill="#ffffff" />
          
          {/* Visera blanca de la gorra */}
          <path d="M 17 9 L 32 8.5 Q 30 11.5 23 11 L 17 10 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.7" />
        </g>
      </svg>
    </div>
  )
}
