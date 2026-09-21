export default function GameControls({onMove,onAttack}) {
  return <div className="touch-controls">
    <div className="touch-row"><button type="button" onClick={()=>onMove('up')}>W</button></div>
    <div className="touch-row"><button type="button" onClick={()=>onMove('left')}>A</button><button type="button" onClick={()=>onMove('down')}>S</button><button type="button" onClick={()=>onMove('right')}>D</button></div>
    <div className="touch-row"><button type="button" className="attack-button" onClick={onAttack}>SPACE · ATTACK</button></div>
  </div>
}