export default function LeaderboardRow({ position, score }) {
  return (
    <div className="leaderboard-row">
      <span className="rank-number">{String(position).padStart(2,'0')}</span>
      <div><strong>{score.alias}</strong><span>{score.result === 'victory' ? 'Victory' : 'Run failed'}</span></div>
      <strong className="rank-score">{score.score} pts</strong>
    </div>
  )
}