const STORAGE_KEY = 'realm-of-ashes-scores'

function readScores() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getLocalScores() {
  return readScores().sort((a, b) => Number(b.score) - Number(a.score))
}

export function saveLocalScore(score) {
  const entry = { ...score, localOnly: true }
  const scores = [entry, ...readScores()]
    .sort((a, b) => Number(b.score) - Number(a.score))
    .slice(0, 50)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  return entry
}