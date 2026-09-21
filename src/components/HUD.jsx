export default function HUD({ alias, lives, time, enemies, hasKey }) {
  return (
    <header className="hud">
      <div className="hud-block hud-player"><span className="hud-label">PLAYER</span><strong>{alias}</strong></div>
      <div className="hud-block"><span className="hud-label">LIFE</span><div className="life-pips">{[0,1,2].map((pip) => <span key={pip} className={'life-pip ' + (pip < lives ? 'is-alive' : '')} />)}</div></div>
      <div className={'hud-block hud-time ' + (time <= 10 ? 'is-danger' : '')}><span className="hud-label">TIME</span><strong>{String(time).padStart(2,'0')}s</strong></div>
      <div className="hud-block"><span className="hud-label">OBJECTIVE</span><strong>{enemies > 0 ? enemies + ' enemies' : hasKey ? 'Exit unlocked' : 'Get the key'}</strong></div>
    </header>
  )
}