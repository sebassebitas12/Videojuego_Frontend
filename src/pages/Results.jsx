import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '../components/Button'
import { createScore } from '../services/api'
import BallSprite from '../components/sprites/BallSprite'
import TrainerSprite from '../components/sprites/TrainerSprite'
import N8nModal from '../components/N8nModal'
import { fallbackLevels } from '../data/fallbackLevel'

export default function Results() {
  const { runId } = useParams()
  const [run] = useState(() => JSON.parse(sessionStorage.getItem('run-' + runId) || 'null'))
  const [saved, setSaved] = useState(false)
  const [source, setSource] = useState('local')
  const [isN8nOpen, setIsN8nOpen] = useState(false)

  useEffect(() => {
    if (!run) return
    const submitKey = 'submitted-' + (run.runId || runId)
    if (sessionStorage.getItem(submitKey)) {
      setSaved(true)
      return
    }
    sessionStorage.setItem(submitKey, 'true')

    createScore(run)
      .then((response) => {
        setSource(response.source || 'api')
        setSaved(true)
      })
      .catch(() => {
        setSaved(true)
        setSource('local')
      })
  }, [run, runId])

  if (!run) {
    return (
      <main className="screen center">
        <section className="panel">
          <h1>Partida no encontrada</h1>
          <p className="muted">No hay registros de la partida solicitada.</p>
          <Button to="/">Volver al Inicio</Button>
        </section>
      </main>
    )
  }

  const isVictory = run.result === 'victory'
  const currentLevelId = Number(run.levelId) || 1
  const nextLevelId = currentLevelId < 3 ? currentLevelId + 1 : null
  const nextLevel = nextLevelId ? fallbackLevels.find((l) => l.id === nextLevelId) : null

  return (
    <main className="screen center results-screen">
      <section className={`panel result-card ${isVictory ? 'result-victory' : 'result-defeat'}`}>
        <div className="result-header">
          <div className="result-avatar">
            <TrainerSprite direction="right" isMoving={false} isHurt={!isVictory} />
          </div>
          <p className="eyebrow">{isVictory ? '🎉 ¡VICTORIA! RUTA COMPLETADA' : '💀 DERROTA • INTÉNTALO DE NUEVO'}</p>
          <h1 className="result-score-title">{run.score} <span className="pts-label">PTS</span></h1>
          <p className="result-trainer-name">Entrenador: <strong>{run.alias}</strong> • Nivel {currentLevelId}</p>
        </div>

        {/* Desglose de puntuación */}
        <div className="score-breakdown-grid">
          <div className="score-stat-card">
            <span className="stat-label">Poké Balls</span>
            <div className="stat-val-group">
              <span className="stat-icon">🔴</span>
              <strong>{run.collectibles || 0}</strong>
            </div>
            <span className="stat-points">+{(run.collectibles || 0) * 150} pts</span>
          </div>

          <div className="score-stat-card">
            <span className="stat-label">Tiempo Restante</span>
            <div className="stat-val-group">
              <span className="stat-icon">⏱</span>
              <strong>{run.time || 0}s</strong>
            </div>
            <span className="stat-points">+{(run.time || 0) * 10} pts</span>
          </div>

          <div className="score-stat-card">
            <span className="stat-label">Daño Recibido</span>
            <div className="stat-val-group">
              <span className="stat-icon">💔</span>
              <strong>{run.damage || 0}</strong>
            </div>
            <span className="stat-points stat-negative">-{(run.damage || 0) * 50} pts</span>
          </div>

          <div className="score-stat-card">
            <span className="stat-label">Pokémon Derrotados</span>
            <div className="stat-val-group">
              <span className="stat-icon">🐾</span>
              <strong>{run.enemiesDefeated || 0}</strong>
            </div>
            <span className="stat-points">Bonus</span>
          </div>
        </div>

        {/* Notificación de guardado y n8n */}
        <div className={`save-status-badge status-${source}`}>
          <div className="status-indicator-dot" />
          <div className="status-text">
            {saved ? (
              source === 'n8n' ? (
                <><strong>n8n Webhook:</strong> Puntaje transmitido y procesado exitosamente por la automatización.</>
              ) : source === 'api' ? (
                <><strong>JSON Server:</strong> Guardado en la base de datos <code>db.json</code>.</>
              ) : (
                <><strong>Almacenamiento Local:</strong> Guardado en localStorage (Servidor o n8n no disponibles).</>
              )
            ) : (
              'Guardando resultado de la partida...'
            )}
          </div>
          <button
            type="button"
            className="mini-n8n-link"
            onClick={() => setIsN8nOpen(true)}
          >
            Ver flujo n8n
          </button>
        </div>

        {/* Acciones de navegación */}
        <div className="result-actions">
          {isVictory && nextLevel ? (
            <Link to={`/game/${nextLevelId}`} className="button button-next-level">
              ▶️ Avanzar a: {nextLevel.name}
            </Link>
          ) : isVictory ? (
            <div className="champion-badge">🏆 ¡FELICIDADES! ¡ERES EL CAMPEÓN DE TODAS LAS RUTAS!</div>
          ) : null}

          <Link to={`/game/${currentLevelId}`} className="button button-retry">
            🔄 Reintentar Nivel {currentLevelId}
          </Link>
          <Link to="/" className="button button-secondary">
            🏠 Inicio & Selector de Niveles
          </Link>
          <Link to="/leaderboard" className="button button-secondary">
            📊 Ver Leaderboard
          </Link>
        </div>
      </section>

      {/* Modal de n8n interactivo */}
      <N8nModal isOpen={isN8nOpen} onClose={() => setIsN8nOpen(false)} />
    </main>
  )
}