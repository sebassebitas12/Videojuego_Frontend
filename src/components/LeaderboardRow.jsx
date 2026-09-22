import React from 'react'

export default function LeaderboardRow({ position, score }) {
  const isTop3 = position <= 3
  const medals = ['🥇', '🥈', '🥉']
  const medal = isTop3 ? medals[position - 1] : null

  return (
    <div className={`leaderboard-row ${isTop3 ? 'is-top-rank' : ''}`}>
      <span className="rank-number">
        {medal ? <span className="rank-medal">{medal}</span> : String(position).padStart(2, '0')}
      </span>

      <div className="rank-trainer-info">
        <strong className="rank-alias">{score.alias || 'Anónimo'}</strong>
        <span className="rank-meta">
          Nivel {score.levelId || 1} • {score.collectibles || 0} Poké Balls
        </span>
      </div>

      <div className="rank-result-tag">
        <span className={`badge-pill ${score.result === 'victory' ? 'badge-victory' : 'badge-defeat'}`}>
          {score.result === 'victory' ? 'Victoria' : 'Derrota'}
        </span>
      </div>

      <div className="rank-score-cell">
        <strong className="rank-score-val">{score.score}</strong>
        <span className="pts-tiny">pts</span>
      </div>
    </div>
  )
}