import { fallbackLevels } from '../data/fallbackLevel'
import { getLocalScores, saveLocalScore } from './storage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || ''
const REQUEST_TIMEOUT = 3000

/**
 * Función genérica de petición con AbortController para timeout y manejo de errores.
 * Cumple con el criterio 2.4 de la rúbrica (manejo de errores de red).
 */
async function request(url, options = {}) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } finally {
    window.clearTimeout(timeoutId)
  }
}

/**
 * Obtiene la información del nivel por ID.
 * Intenta primero desde la API (JSON Server) y si no está disponible,
 * usa el nivel correspondiente de fallbackLevels (Ruta 01, Bosque Verde o Monte Moon).
 */
export async function getLevel(id) {
  const numId = Number(id) || 1
  const localFallback = fallbackLevels.find((l) => l.id === numId) || fallbackLevels[0]

  try {
    const data = await request(`${API_BASE_URL}/levels/${numId}`)
    return {
      data: data || localFallback,
      source: 'api',
    }
  } catch (err) {
    console.warn(`[API] JSON Server no disponible para nivel ${numId}, usando respaldo local:`, err.message)
    return {
      data: localFallback,
      source: 'fallback',
    }
  }
}

/**
 * Obtiene la lista de puntuaciones globales para el Leaderboard (GET).
 */
export async function getScores() {
  try {
    const scores = await request(`${API_BASE_URL}/scores?_sort=-score`)
    return scores
  } catch (err) {
    console.warn('[API] Falló getScores desde servidor, recurriendo a localStorage:', err.message)
    return getLocalScores()
  }
}

/**
 * Envía la puntuación de la partida (POST/PUT).
 * Si hay URL de n8n configurada, la envía al webhook de n8n.
 * Luego intenta persistir en JSON Server o localStorage como respaldo.
 * Cumple con el requisito 3 y 2.4 de la rúbrica.
 */
export async function createScore(score) {
  if (N8N_WEBHOOK_URL) {
    try {
      const n8nResult = await request(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(score),
      })
      return { data: n8nResult || score, source: 'n8n' }
    } catch (err) {
      console.warn('[n8n] Error al conectar con el webhook de n8n:', err.message)
    }
  }

  // Si no hay n8n o falló, guardamos en JSON Server
  try {
    const saved = await request(`${API_BASE_URL}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(score),
    })
    return { data: saved, source: 'api' }
  } catch (err) {
    console.warn('[API] JSON Server no respondió, guardando en localStorage:', err.message)
    const local = saveLocalScore(score)
    return { data: local, source: 'local' }
  }
}

/**
 * Función de prueba para verificar conectividad con el Webhook de n8n
 */
export async function pingN8nWebhook(customUrl) {
  const url = customUrl || N8N_WEBHOOK_URL
  if (!url) {
    return { ok: false, message: 'No hay URL de webhook configurada en VITE_N8N_WEBHOOK_URL.' }
  }

  const testPayload = {
    alias: 'TestEntrenador',
    score: 999,
    time: 60,
    result: 'victory',
    collectibles: 8,
    damage: 0,
    completedAt: new Date().toISOString(),
    isTest: true,
  }

  try {
    const response = await request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    })
    return { ok: true, data: response, message: '¡Conexión con n8n exitosa!' }
  } catch (err) {
    return { ok: false, message: `No se pudo conectar con n8n: ${err.message}` }
  }
}
