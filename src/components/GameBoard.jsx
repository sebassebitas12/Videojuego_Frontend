import Entity from './Entity'
import { cellId } from '../utils/game'

export default function GameBoard({ level, player, enemies, hasKey, attackCell, attackVisible }) {
  const enemyMap = new Map(enemies.map((enemy) => [cellId(enemy), enemy]))
  const wallSet = new Set(level.walls.map((wall) => cellId(wall)))
  const exitOpen = hasKey && enemies.length === 0

  return <div className="dungeon-wrap">
    <div className="dungeon-meta"><span>ROOM 01</span><strong>{level.name}</strong><span>{exitOpen ? 'EXIT READY' : 'PURGE THE ROOM'}</span></div>
    <div className="dungeon" style={{gridTemplateColumns:'repeat('+level.width+',minmax(0,1fr))'}}>
      {Array.from({length:level.width*level.height},(_,index)=>{
        const x=index%level.width
        const y=Math.floor(index/level.width)
        const id=x+'-'+y
        const wall=wallSet.has(id)
        const enemy=enemyMap.get(id)
        const playerHere=player.x===x&&player.y===y
        const keyHere=!hasKey&&level.key.x===x&&level.key.y===y
        const exitHere=level.exit.x===x&&level.exit.y===y
        return <div key={id} className={'tile '+(wall?'wall':'')}>
          {playerHere&&<Entity type="player" direction={player.direction} label="Jugador"/>}
          {!playerHere&&enemy&&<Entity type="enemy" label="Enemigo"/>}
          {!playerHere&&!enemy&&keyHere&&<Entity type="key" label="Llave"/>}
          {!playerHere&&!enemy&&!keyHere&&exitHere&&<Entity type={exitOpen?'exit-open':'exit'} label="Salida"/>}
          {attackVisible&&attackCell&&attackCell.x===x&&attackCell.y===y&&<span className="attack-mark"/>}
        </div>
      })}
    </div>
  </div>
}