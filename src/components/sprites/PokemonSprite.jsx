import React from 'react'

/**
 * Componente PokemonSprite: Representa Pokémon salvajes y auténticos (Rattata, Pidgey, Zubat)
 * con animaciones según su tipo y dirección de movimiento.
 */
export default function PokemonSprite({ type = 'rattata', direction = 1, isDefeated = false }) {
  const isFacingLeft = direction < 0

  return (
    <div
      className={`pokemon-entity pokemon-${type} ${isFacingLeft ? 'facing-left' : 'facing-right'} ${isDefeated ? 'is-defeated' : ''}`}
      aria-label={`Pokémon enemigo ${type}`}
    >
      {type === 'rattata' && (
        <svg viewBox="0 0 38 32" className="pokemon-svg rattata-svg" width="100%" height="100%">
          <defs>
            <linearGradient id="rattataBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="rattataBelly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          {/* Sombra */}
          <ellipse cx="19" cy="30" rx="14" ry="2" fill="rgba(0, 0, 0, 0.3)" />

          {/* Cola rizada clásica de Rattata */}
          <path
            d="M 6 22 Q 2 15 5 10 Q 9 5 13 8 Q 11 11 7 14"
            fill="none"
            stroke="#9333ea"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="rattata-tail"
          />

          {/* Pata trasera */}
          <ellipse cx="10" cy="27" rx="3.5" ry="2.5" fill="#7e22ce" />
          <ellipse cx="10" cy="28.5" rx="3" ry="1.5" fill="#fde047" />

          {/* Cuerpo redondeado */}
          <ellipse cx="18" cy="20" rx="12" ry="8.5" fill="url(#rattataBody)" />

          {/* Barriga cremosa/amarilla */}
          <path d="M 12 21 Q 20 28 28 21 Q 22 17 14 18 Z" fill="url(#rattataBelly)" />

          {/* Pata delantera */}
          <ellipse cx="25" cy="27" rx="3" ry="2" fill="#7e22ce" />
          <ellipse cx="26" cy="28.5" rx="2.5" ry="1.2" fill="#fde047" />

          {/* Oreja lejana */}
          <ellipse cx="22" cy="7" rx="3.5" ry="5.5" fill="#7e22ce" transform="rotate(-15 22 7)" />
          <ellipse cx="22" cy="7" rx="2" ry="3.5" fill="#f472b6" transform="rotate(-15 22 7)" />

          {/* Cabeza */}
          <circle cx="28" cy="15" r="7" fill="url(#rattataBody)" />

          {/* Oreja cercana */}
          <ellipse cx="26" cy="7" rx="4" ry="6" fill="#9333ea" transform="rotate(10 26 7)" />
          <ellipse cx="26" cy="7" rx="2.2" ry="4" fill="#f472b6" transform="rotate(10 26 7)" />

          {/* Ojo rojo amenazante */}
          <ellipse cx="30" cy="14" rx="2" ry="1.8" fill="#dc2626" />
          <circle cx="31" cy="13.5" r="0.7" fill="#ffffff" />
          <path d="M 28 12 L 32 13" stroke="#4a044e" strokeWidth="0.8" />

          {/* Dientes incisivos de roedor */}
          <rect x="33" y="18" width="2" height="3" fill="#ffffff" stroke="#9333ea" strokeWidth="0.5" rx="0.5" />

          {/* Hocico y nariz */}
          <circle cx="35" cy="17" r="1.2" fill="#ec4899" />

          {/* Bigotes */}
          <line x1="33" y1="16" x2="38" y2="14" stroke="#4a044e" strokeWidth="0.8" />
          <line x1="33" y1="18" x2="38" y2="19" stroke="#4a044e" strokeWidth="0.8" />
        </svg>
      )}

      {type === 'pidgey' && (
        <svg viewBox="0 0 38 32" className="pokemon-svg pidgey-svg" width="100%" height="100%">
          <defs>
            <linearGradient id="pidgeyBrown" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="pidgeyCream" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>

          {/* Sombra */}
          <ellipse cx="19" cy="30" rx="10" ry="2" fill="rgba(0, 0, 0, 0.3)" />

          {/* Cola de plumas */}
          <path d="M 5 21 L 1 18 L 4 23 L 0 24 L 6 25 Z" fill="#78350f" />

          {/* Cuerpo de Pidgey */}
          <ellipse cx="19" cy="20" rx="10" ry="7.5" fill="url(#pidgeyBrown)" />

          {/* Pecho crema */}
          <ellipse cx="23" cy="21" rx="6" ry="6" fill="url(#pidgeyCream)" />

          {/* Pata */}
          <path d="M 18 27 L 18 30 L 21 30 M 16 30 L 18 30" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />

          {/* Ala animada */}
          <g className="pidgey-wing">
            <path d="M 14 18 Q 10 11 18 13 Q 23 16 19 23 Z" fill="#b45309" stroke="#78350f" strokeWidth="0.7" />
            <path d="M 13 16 Q 16 14 20 18" stroke="#fde68a" strokeWidth="1" fill="none" />
          </g>

          {/* Cabeza */}
          <circle cx="27" cy="14" r="6" fill="url(#pidgeyBrown)" />

          {/* Cresta de plumas marrones y crema */}
          <path d="M 23 10 Q 28 6 31 10 Q 28 9 25 10" fill="#dc2626" />
          <path d="M 22 9 Q 25 5 29 8" stroke="#fef08a" strokeWidth="1.2" fill="none" />

          {/* Máscara negra clásica alrededor de los ojos */}
          <path d="M 25 13 Q 29 12 31 14 Q 28 15 25 13" fill="#1f2937" />

          {/* Ojo */}
          <circle cx="28" cy="13.5" r="1.5" fill="#facc15" />
          <circle cx="28.2" cy="13.5" r="0.8" fill="#111827" />

          {/* Pico puntiagudo */}
          <polygon points="32,14 38,16 32,18" fill="#f97316" stroke="#c2410c" strokeWidth="0.5" />
        </svg>
      )}

      {type === 'zubat' && (
        <svg viewBox="0 0 42 34" className="pokemon-svg zubat-svg" width="100%" height="100%">
          <defs>
            <linearGradient id="zubatBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="zubatWing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>

          {/* Sombra flotante */}
          <ellipse cx="21" cy="32" rx="9" ry="2" fill="rgba(0, 0, 0, 0.25)" />

          {/* Ala izquierda con aleteo */}
          <g className="zubat-wing wing-left">
            <path d="M 16 15 Q 4 3 2 13 Q 4 22 15 19 Z" fill="url(#zubatWing)" stroke="#0369a1" strokeWidth="0.8" />
            <path d="M 16 15 Q 8 10 2 13" stroke="#67e8f9" strokeWidth="1.2" fill="none" />
          </g>

          {/* Ala derecha con aleteo */}
          <g className="zubat-wing wing-right">
            <path d="M 26 15 Q 38 3 40 13 Q 38 22 27 19 Z" fill="url(#zubatWing)" stroke="#0369a1" strokeWidth="0.8" />
            <path d="M 26 15 Q 34 10 40 13" stroke="#67e8f9" strokeWidth="1.2" fill="none" />
          </g>

          {/* Patitas / Colas traseras dobles */}
          <path d="M 18 24 L 16 30 M 24 24 L 26 30" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cuerpo esférico azul */}
          <circle cx="21" cy="16" r="7.5" fill="url(#zubatBlue)" />

          {/* Orejas puntiagudas (Zubat es ciego y usa ecolocación) */}
          <polygon points="17,10 15,3 19,8" fill="url(#zubatBlue)" stroke="#0369a1" strokeWidth="0.6" />
          <polygon points="17,8 16,5 18,7" fill="#f472b6" />

          <polygon points="25,10 27,3 23,8" fill="url(#zubatBlue)" stroke="#0369a1" strokeWidth="0.6" />
          <polygon points="25,8 26,5 24,7" fill="#f472b6" />

          {/* Boca abierta grande de Zubat */}
          <ellipse cx="21" cy="18" rx="4.5" ry="3.5" fill="#581c87" stroke="#3b0764" strokeWidth="0.8" />

          {/* Colmillos afilados característicos */}
          <polygon points="18,15 19.5,15 18.8,17.5" fill="#ffffff" />
          <polygon points="22.5,15 24,15 23.2,17.5" fill="#ffffff" />
          <polygon points="19,21 20.5,21 19.8,19" fill="#ffffff" />
          <polygon points="21.5,21 23,21 22.2,19" fill="#ffffff" />
        </svg>
      )}
    </div>
  )
}
