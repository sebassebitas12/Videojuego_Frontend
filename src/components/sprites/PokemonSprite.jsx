import React from 'react'

/**
 * Componente PokemonSprite: Sprites auténticos y fieles a Pokémon
 * (Rattata con cola en espiral y colmillos, Pidgey con cresta y máscara, Zubat con colmillos y alas membranosas).
 */
export default function PokemonSprite({ type = 'rattata', direction = 1, isDefeated = false }) {
  const isFacingLeft = direction < 0

  return (
    <div
      className={`pokemon-entity pokemon-${type} ${isFacingLeft ? 'facing-left' : 'facing-right'} ${isDefeated ? 'is-defeated' : ''}`}
      aria-label={`Pokémon enemigo ${type}`}
    >
      {type === 'rattata' && (
        <svg viewBox="0 0 44 32" className="pokemon-svg rattata-svg" width="100%" height="100%">
          <defs>
            <linearGradient id="ratPurple" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
            <linearGradient id="ratCream" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          {/* Sombra de suelo */}
          <ellipse cx="22" cy="30" rx="15" ry="2" fill="rgba(0, 0, 0, 0.35)" />

          {/* Cola con espiral clásica de Rattata */}
          <g className="rattata-tail">
            <path
              d="M 10 23 Q 4 18 6 11 Q 9 5 15 8 Q 12 12 7 15 Q 11 17 9 24"
              fill="none"
              stroke="#7e22ce"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Espiral final */}
            <circle cx="12" cy="8" r="2.2" fill="#9333ea" stroke="#6b21a8" strokeWidth="0.8" />
          </g>

          {/* Pata trasera morada */}
          <ellipse cx="12" cy="27" rx="4.5" ry="3" fill="#6b21a8" />
          <ellipse cx="12" cy="28.5" rx="3.5" ry="1.5" fill="#fde047" />

          {/* Cuerpo redondeado morado */}
          <ellipse cx="21" cy="20" rx="13" ry="9" fill="url(#ratPurple)" stroke="#581c87" strokeWidth="0.6" />

          {/* Vientre y pecho crema */}
          <path d="M 14 21 Q 23 28 32 21 Q 25 18 16 19 Z" fill="url(#ratCream)" />

          {/* Pata delantera */}
          <ellipse cx="29" cy="27" rx="3.5" ry="2.2" fill="#6b21a8" />
          <ellipse cx="30" cy="28.5" rx="2.5" ry="1.2" fill="#fde047" />

          {/* Oreja lejana */}
          <ellipse cx="25" cy="7" rx="4" ry="6" fill="#6b21a8" transform="rotate(-15 25 7)" />
          <ellipse cx="25" cy="7" rx="2.2" ry="4" fill="#f472b6" transform="rotate(-15 25 7)" />

          {/* Cabeza de Rattata */}
          <circle cx="31" cy="15" r="7.5" fill="url(#ratPurple)" stroke="#581c87" strokeWidth="0.6" />

          {/* Mandíbula inferior color crema */}
          <path d="M 28 17 Q 35 22 38 18 Q 33 16 28 17 Z" fill="url(#ratCream)" />

          {/* Oreja cercana grande con interior rosa */}
          <ellipse cx="29" cy="7" rx="4.5" ry="6.5" fill="#7e22ce" stroke="#581c87" strokeWidth="0.6" transform="rotate(8 29 7)" />
          <ellipse cx="29" cy="7" rx="2.5" ry="4.5" fill="#f472b6" transform="rotate(8 29 7)" />

          {/* Ojo rojo feroz */}
          <ellipse cx="33.5" cy="13.5" rx="2.2" ry="2" fill="#dc2626" />
          <circle cx="34.5" cy="13" r="0.8" fill="#ffffff" />
          <path d="M 31 11.5 L 36 12.5" stroke="#3b0764" strokeWidth="1" strokeLinecap="round" />

          {/* Colmillos prominentes superiores de roedor */}
          <polygon points="36,17.5 38.5,17.5 38,21.5 36.5,21.5" fill="#ffffff" stroke="#7e22ce" strokeWidth="0.5" />

          {/* Nariz rosa */}
          <circle cx="39.5" cy="16.5" r="1.3" fill="#ec4899" />

          {/* Bigotes */}
          <line x1="36" y1="15.5" x2="43" y2="13" stroke="#3b0764" strokeWidth="0.8" />
          <line x1="36" y1="17.5" x2="43" y2="19" stroke="#3b0764" strokeWidth="0.8" />
        </svg>
      )}

      {type === 'pidgey' && (
        <svg viewBox="0 0 42 36" className="pokemon-svg pidgey-svg" width="100%" height="100%">
          <defs>
            <linearGradient id="pidgeyBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="pidgeyBelly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>

          {/* Sombra de vuelo */}
          <ellipse cx="21" cy="33" rx="12" ry="2.2" fill="rgba(0, 0, 0, 0.25)" />

          {/* Cola de plumas marrones */}
          <path d="M 6 22 L 0 18 L 4 24 L 0 26 L 6 27 Z" fill="#451a03" />

          {/* Cuerpo */}
          <ellipse cx="21" cy="22" rx="11" ry="8.5" fill="url(#pidgeyBack)" stroke="#451a03" strokeWidth="0.6" />

          {/* Pecho crema */}
          <ellipse cx="26" cy="23" rx="7" ry="7" fill="url(#pidgeyBelly)" />

          {/* Pata */}
          <path d="M 19 29 L 20 33 L 23 33 M 18 33 L 20 33" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" />

          {/* Ala animada */}
          <g className="pidgey-wing">
            <path d="M 15 19 Q 8 10 18 12 Q 24 16 20 25 Z" fill="#b45309" stroke="#582f0e" strokeWidth="0.8" />
            {/* Plumas secundarias crema */}
            <path d="M 12 16 Q 16 13 21 17" stroke="#fde68a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 14 19 Q 17 16 21 21" stroke="#fef3c7" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>

          {/* Cabeza */}
          <circle cx="29" cy="15" r="7" fill="url(#pidgeyBack)" stroke="#451a03" strokeWidth="0.6" />

          {/* Cresta de plumas tricolor de Pidgey */}
          <path d="M 23 10 Q 28 4 33 9 Q 28 8 24 10" fill="#dc2626" />
          <path d="M 24 9 Q 29 3 34 8" stroke="#fde047" strokeWidth="1.2" fill="none" />
          <path d="M 22 11 Q 25 7 28 10" stroke="#78350f" strokeWidth="1" fill="none" />

          {/* Máscara negra clásica alrededor de los ojos */}
          <path d="M 27 13 Q 32 12 34 14 Q 30 16 26 14 Z" fill="#0f172a" />

          {/* Ojo de halcón */}
          <circle cx="30" cy="14" r="1.8" fill="#facc15" />
          <circle cx="30.3" cy="14" r="0.9" fill="#020617" />
          <circle cx="30.7" cy="13.6" r="0.4" fill="#ffffff" />

          {/* Pico afilado */}
          <polygon points="35,14 41,16.5 35,19" fill="#f97316" stroke="#c2410c" strokeWidth="0.6" />
        </svg>
      )}

      {type === 'zubat' && (
        <svg viewBox="0 0 46 34" className="pokemon-svg zubat-svg" width="100%" height="100%">
          <defs>
            <linearGradient id="zubatBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="zubatWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
          </defs>

          {/* Sombra de vuelo */}
          <ellipse cx="23" cy="32" rx="10" ry="2" fill="rgba(0, 0, 0, 0.25)" />

          {/* Ala izquierda de murciélago */}
          <g className="zubat-wing wing-left">
            <path
              d="M 17 16 Q 4 3 2 13 Q 6 22 17 19 Z"
              fill="url(#zubatWingGrad)"
              stroke="#0369a1"
              strokeWidth="0.9"
            />
            {/* Huesos de las alas */}
            <path d="M 17 16 Q 8 9 2 13" stroke="#67e8f9" strokeWidth="1.4" fill="none" />
            <path d="M 12 14 Q 8 18 5 21" stroke="#0369a1" strokeWidth="0.7" fill="none" />
          </g>

          {/* Ala derecha de murciélago */}
          <g className="zubat-wing wing-right">
            <path
              d="M 29 16 Q 42 3 44 13 Q 40 22 29 19 Z"
              fill="url(#zubatWingGrad)"
              stroke="#0369a1"
              strokeWidth="0.9"
            />
            {/* Huesos de las alas */}
            <path d="M 29 16 Q 38 9 44 13" stroke="#67e8f9" strokeWidth="1.4" fill="none" />
            <path d="M 34 14 Q 38 18 41 21" stroke="#0369a1" strokeWidth="0.7" fill="none" />
          </g>

          {/* Colas traseras dobles de Zubat */}
          <path d="M 20 24 L 18 31 M 26 24 L 28 31" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />

          {/* Cuerpo esférico azul */}
          <circle cx="23" cy="16" r="8" fill="url(#zubatBodyGrad)" stroke="#0369a1" strokeWidth="0.8" />

          {/* Orejas puntiagudas */}
          <polygon points="18,10 16,3 21,8" fill="url(#zubatBodyGrad)" stroke="#0369a1" strokeWidth="0.6" />
          <polygon points="18,8 17,5 20,7" fill="#f472b6" />

          <polygon points="28,10 30,3 25,8" fill="url(#zubatBodyGrad)" stroke="#0369a1" strokeWidth="0.6" />
          <polygon points="28,8 29,5 26,7" fill="#f472b6" />

          {/* Boca grande abierta (Zubat no tiene ojos) */}
          <ellipse cx="23" cy="18" rx="5" ry="4" fill="#3b0764" stroke="#1e1b4b" strokeWidth="0.8" />

          {/* Colmillos afilados blancos */}
          <polygon points="19.5,14.5 21.5,14.5 20.5,17" fill="#ffffff" />
          <polygon points="24.5,14.5 26.5,14.5 25.5,17" fill="#ffffff" />
          <polygon points="20.5,21.5 22.5,21.5 21.5,19" fill="#ffffff" />
          <polygon points="23.5,21.5 25.5,21.5 24.5,19" fill="#ffffff" />
        </svg>
      )}
    </div>
  )
}
