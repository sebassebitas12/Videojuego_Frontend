import React from 'react'

export default function LeaderboardRow({ position, score }) {
  const isTop3 = position <= 3
  const medals = ['🥇', '🥈', '🥉']
  const medal = isTop3 ? medals[position - 1] : null
  const levelNum = Number(score.levelId) || 1

  const levelBadges = {
    1: { name: 'Ruta 01', class: 'lvl-route1' },
    2: { name: 'Bosque Verde', class: 'lvl-forest' },
    3: { name: 'Monte Moon', class: 'lvl-cave' },
  }

  const currentLevelBadge = levelBadges[levelNum] || { name: `Nivel ${levelNum}`, class: 'lvl-route1' }

  return (
    <div className={`leaderboard-row ${isTop3 ? `is-top-${position}` : ''}`}>
      {/* Posición / Medalla */}
      <div className="rank-number-col">
        {medal ? (
          <span className="rank-medal-badge" title={`Puesto #${position}`}>{medal}</span>
        ) : (
          <span className="rank-plain-number">#{position}</span>
        )}
      </div>

      {/* Datos del Entrenador */}
      <div className="rank-trainer-info">
        <div className="trainer-name-row">
          <span className="trainer-cap-mini">🧢</span>
          <strong className="rank-alias">{score.alias || 'Entrenador'}</strong>
          <span className={`level-pill-badge ${currentLevelBadge.class}`}>
            {currentLevelBadge.name}
          </span>
        </div>
        <span className="rank-meta">
          🔴 {score.collectibles || 0} Poké Balls • ⏱ {score.time || 0}s restantes
        </span>
      </div>

      {/* Estado (Victoria o Derrota) */}
      <div className="rank-result-tag">
        <span className={`badge-pill ${score.result === 'victory' ? 'badge-victory' : 'badge-defeat'}`}>
          {score.result === 'victory' ? '🏆 Victoria' : '💀 Derrota'}
        </span>
      </div>

      {/* Puntuación */}
      <div className="rank-score-cell">
        <strong className="rank-score-val">{score.score}</strong>
        <span className="pts-tiny">PTS</span>
      </div>
    </div>
  )
}