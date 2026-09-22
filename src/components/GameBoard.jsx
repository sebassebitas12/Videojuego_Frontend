const CAMERA_WIDTH = 960

export default function GameBoard({ level, player, enemies, collectibles, cameraX }) {
  const xPercent = (value) => (value / level.width * 100) + '%'
  const yPercent = (value) => (value / level.height * 100) + '%'
  const sceneWidth = level.width / CAMERA_WIDTH * 100 + '%'
  const cameraOffset = -(cameraX / level.width * 100) + '%'
  return <div className="platform-wrap"><div className="platform-meta"><span>ROUTE 01</span><strong>{level.name}</strong><span>{collectibles.length ? 'COLLECT THEM ALL' : 'FLAG UNLOCKED'}</span></div><div className="platform-world">
    <div className="platform-scene" style={{ width: sceneWidth, transform: 'translate3d(' + cameraOffset + ', 0, 0)' }}>
      <div className="skyline" />
    {level.platforms.map((platform, index) => <div key={'platform-' + index} className="platform" style={{ left: xPercent(platform.x), top: yPercent(platform.y), width: xPercent(platform.width), height: yPercent(platform.height) }} />)}
    {collectibles.map((item) => <div key={item.id} className="pokeball" style={{ left: xPercent(item.x), top: yPercent(item.y) }} aria-label="Poké Ball" />)}
    {enemies.map((enemy) => <div key={enemy.id} className="rattata" style={{ left: xPercent(enemy.x), top: yPercent(enemy.y) }} aria-label="Rattata enemigo"><span /></div>)}
    <div className="goal-flag" style={{ left: xPercent(level.goal.x), top: yPercent(level.goal.y) }}><span>FLAG</span></div>
    <div className={'hero-sprite ' + (player.direction === 'left' ? 'face-left' : '')} style={{ left: xPercent(player.x), top: yPercent(player.y) }}><span className="hero-cap" /><span className="hero-body" /><span className="hero-leg one" /><span className="hero-leg two" /></div>
    </div>
  </div></div>
}
