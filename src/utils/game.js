export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

export const KEY_TO_DIRECTION = {
  w: 'up',
  arrowup: 'up',
  s: 'down',
  arrowdown: 'down',
  a: 'left',
  arrowleft: 'left',
  d: 'right',
  arrowright: 'right',
}

const OPPOSITE_DIRECTIONS = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export function sameCell(first, second) {
  return first.x === second.x && first.y === second.y
}

export function cellId(cell) {
  return cell.x + '-' + cell.y
}

export function isInsideLevel(cell, level) {
  return cell.x >= 0 && cell.y >= 0 && cell.x < level.width && cell.y < level.height
}

export function canEnterCell(cell, level, wallSet) {
  return isInsideLevel(cell, level) && !wallSet.has(cellId(cell))
}

export function moveCell(cell, direction) {
  const offset = DIRECTIONS[direction]
  return { x: cell.x + offset.x, y: cell.y + offset.y }
}

export function getOppositeDirection(direction) {
  return OPPOSITE_DIRECTIONS[direction]
}

export function calculateScore(timeRemaining, enemiesDefeated, damageReceived) {
  return Math.max(0, (timeRemaining * 10) + (enemiesDefeated * 100) - (damageReceived * 50))
}

export function getScoreRank(score) {
  if (score >= 800) return 'S'
  if (score >= 650) return 'A'
  if (score >= 500) return 'B'
  if (score >= 300) return 'C'
  return 'D'
}

export function getChaseDirections(enemy, player) {
  const dx = player.x - enemy.x
  const dy = player.y - enemy.y

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? ['right', 'down', 'up', 'left']
      : ['left', 'down', 'up', 'right']
  }

  return dy >= 0
    ? ['down', 'right', 'left', 'up']
    : ['up', 'right', 'left', 'down']
}

export function moveEnemies(enemies, player, level, wallSet) {
  const occupied = new Set(enemies.map(cellId))
  let playerHit = false
  let playerHitDirection = null

  const nextEnemies = enemies.map((enemy) => {
    const directions = getChaseDirections(enemy, player)
    occupied.delete(cellId(enemy))

    for (const direction of directions) {
      const candidate = moveCell(enemy, direction)

      if (!canEnterCell(candidate, level, wallSet)) continue

      if (sameCell(candidate, player)) {
        playerHit = true
        playerHitDirection ||= direction
        occupied.add(cellId(enemy))
        return enemy
      }

      const targetId = cellId(candidate)
      if (occupied.has(targetId)) continue

      occupied.add(targetId)
      return { ...enemy, x: candidate.x, y: candidate.y }
    }

    occupied.add(cellId(enemy))
    return enemy
  })

  return { enemies: nextEnemies, playerHit, playerHitDirection }
}

export function getAdjacentCell(cell, direction) {
  return moveCell(cell, direction)
}
