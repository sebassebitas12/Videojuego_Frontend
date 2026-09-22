import React from 'react'

/**
 * Componente GoalFlag: Banderín oficial de Checkpoint de la Liga Pokémon
 * con poste de acero, bandera ondeante con Pokéball y luz indicadora de meta.
 */
export default function GoalFlag({ isUnlocked = false }) {
  return (
    <div className={`goal-checkpoint ${isUnlocked ? 'is-unlocked' : 'is-locked'}`} aria-label="Meta del nivel">
      <svg viewBox="0 0 44 68" className="goal-svg" width="100%" height="100%">
        <defs>
          <linearGradient id="poleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <radialGradient id="goalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Resplandor cuando está desbloqueada */}
        {isUnlocked && <ellipse cx="22" cy="34" rx="20" ry="30" fill="url(#goalGlow)" className="goal-glow-aura" />}

        {/* Base del poste */}
        <ellipse cx="8" cy="65" rx="7" ry="2.5" fill="#334155" />
        <rect x="4" y="61" width="8" height="3" fill="#475569" rx="1" />

        {/* Mástil de acero */}
        <rect x="6.5" y="4" width="3" height="58" fill="url(#poleGrad)" rx="1.5" />

        {/* Remate dorado superior */}
        <circle cx="8" cy="4" r="3.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        <circle cx="7.2" cy="3" r="1.2" fill="#ffffff" />

        {/* Bandera triangular ondeante con emblema Pokémon */}
        <g className="flag-cloth">
          <path
            d="M 9.5 6 Q 24 10 38 7 Q 28 17 40 22 Q 22 23 9.5 28 Z"
            fill="url(#flagGrad)"
            stroke="#92400e"
            strokeWidth="1"
          />

          {/* Símbolo de Poké Ball en la bandera */}
          <circle cx="21" cy="16" r="5" fill="#ffffff" stroke="#78350f" strokeWidth="0.8" />
          <path d="M 16 16 A 5 5 0 0 1 26 16 Z" fill="#ef4444" />
          <line x1="16" y1="16" x2="26" y2="16" stroke="#78350f" strokeWidth="0.8" />
          <circle cx="21" cy="16" r="1.8" fill="#ffffff" stroke="#78350f" strokeWidth="0.6" />
        </g>

        {/* Texto o aviso de GOAL */}
        <g transform="translate(6, 42)">
          <rect x="5" y="0" width="28" height="12" rx="3" fill="#0f172a" stroke="#fbbf24" strokeWidth="1" />
          <text x="19" y="8.5" fill="#fbbf24" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            {isUnlocked ? 'GOAL!' : 'LOCKED'}
          </text>
        </g>
      </svg>
    </div>
  )
}
