import { useEffect, useState } from 'react'
import LeaderboardRow from '../components/LeaderboardRow'
import Button from '../components/Button'
import { getScores } from '../services/api'
import { Link } from 'react-router-dom'

export default function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    getScores()
      .then((data) => {
        if (!active) return
        // Aseguramos orden descendente por puntuación
        const sorted = (data || []).sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0))
        setScores(sorted)
        setLoading(false)
      })
      .catch((err) => {
        if (!active) return
        console.warn('Error al cargar leaderboard:', err)
        setError(true)
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="screen center leaderboard-screen">
      <section className="panel leaderboard-panel">
        <div className="leaderboard-header">
          <p className="eyebrow">RANKING GLOBAL DE ENTRENADORES</p>
          <h1>Salón de la Fama</h1>
          <p className="lead">Las mejores expediciones por las rutas de Kanto registradas en la base de datos.</p>
        </div>

        {loading && (
          <div className="leaderboard-loading">
            <div className="mini-spinner" />
            <p>Consultando puntuaciones...</p>
          </div>
        )}

        {error && (
          <div className="api-notice error-notice">
            ⚠️ No se pudo conectar con JSON Server. Mostrando registros almacenados localmente.
          </div>
        )}

        {!loading && scores.length === 0 && (
          <div className="empty-scores">
            <p className="muted">Aún no hay puntuaciones registradas en el Salón de la Fama.</p>
            <p>¡Sé el primer entrenador en completar una ruta!</p>
          </div>
        )}

        {!loading && scores.length > 0 && (
          <div className="scores-table-wrap">
            <div className="scores-table-header">
              <span>POS</span>
              <span>ENTRENADOR</span>
              <span>ESTADO</span>
              <span>PUNTOS</span>
            </div>
            <div className="scores-rows-container">
              {scores.slice(0, 10).map((scoreItem, idx) => (
                <LeaderboardRow
                  key={scoreItem.id || `score-${idx}`}
                  position={idx + 1}
                  score={scoreItem}
                />
              ))}
            </div>
          </div>
        )}

        <div className="leaderboard-actions">
          <Link to="/" className="button">
            🎮 Jugar una Ruta
          </Link>
          <Button to="/game/1" className="button-secondary">
            Ruta 01 Directa
          </Button>
        </div>
      </section>
    </main>
  )
}