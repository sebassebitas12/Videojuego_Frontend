import { fallbackLevel } from '../data/fallbackLevel'
import { getLocalScores, saveLocalScore } from './storage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const REQUEST_TIMEOUT = 2500

async function request(url, options = {}) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    if (!response.ok) {
      throw new Error('API request failed')
    }
    return response.json()
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export async function getLevel(id) {
  try {
    return {
      data: await request(API_BASE_URL + '/levels/' + id),
      source: 'api',
    }
  } catch {
    return {
      data: fallbackLevel,
      source: 'fallback',
    }
  }
}

export async function getScores() {
  try {
    return await request(API_BASE_URL + '/scores?_sort=-score')
  } catch {
    return getLocalScores()
  }
}

export async function createScore(score) {
  try {
    return await request(API_BASE_URL + '/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(score),
    })
  } catch {
    return saveLocalScore(score)
  }
}
