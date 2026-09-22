import { useEffect, useMemo, useState } from 'react'
import LeaderboardRow from '../components/LeaderboardRow'
import { getScores } from '../services/api'
import { Link } from 'react-router-dom'

export default function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('all')

  const fetchScores = () => {
    setLoading(true)
    setError(false)
    getScores()
      .then((data) => {
        setScores(data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.warn('Error al cargar leaderboard:', err)
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchScores()
  }, [])

  // Filtrado, deduplicación y ordenamiento memoizado (Rubro 2.2 useMemo)
  const processedScores = useMemo(() => {
    // 1. Filtrar pruebas y scores inválidos
    const validScores = scores.filter((s) => !s.isTest && s.alias && s.score !== undefined)

    // 2. Deduplicar por runId para evitar repeticiones
    const seenRuns = new Set()
    const uniqueScores = []
    for (const item of validScores) {
      const key = item.runId || `${item.alias}-${item.score}-${item.levelId}`
      if (!seenRuns.has(key)) {
        seenRuns.add(key)
        uniqueScores.push(item)
      }
    }

    // 3. Filtrar por nivel si no es 'all'
    const filtered =
      selectedLevelFilter === 'all'
        ? uniqueScores
        : uniqueScores.filter((s) => String(s.levelId) === String(selectedLevelFilter))

    // 4. Ordenar descendente por puntuación
    return filtered.sort((a, b) => Number(b.score) - Number(a.score))
  }, [scores, selectedLevelFilter])

  const top3 = processedScores.slice(0, 3)

  return (
    <main className="screen center leaderboard-screen">
      <section className="panel leaderboard-panel">
        <div className="leaderboard-header">
          <div className="leaderboard-badge">
            <span className="eyebrow">LIGA POKÉMON • SALÓN DE LA FAMA</span>
          </div>
          <h1>Ranking de Entrenadores</h1>
          <p className="lead">
            Las mejores puntuaciones registradas en las rutas de Kanto. Persistido en tiempo real en la base de datos.
          </p>
        </div>

        {/* Filtros por Ruta / Nivel */}
        <div className="leaderboard-filters-bar">
          <div className="filter-buttons-group">
            <button
              type="button"
              className={`filter-tab-btn ${selectedLevelFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedLevelFilter('all')}
            >
              🌟 Todas las Rutas
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${selectedLevelFilter === '1' ? 'is-active' : ''}`}
              onClick={() => setSelectedLevelFilter('1')}
            >
              🌿 Ruta 01
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${selectedLevelFilter === '2' ? 'is-active' : ''}`}
              onClick={() => setSelectedLevelFilter('2')}
            >
              🌲 Bosque Verde
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${selectedLevelFilter === '3' ? 'is-active' : ''}`}
              onClick={() => setSelectedLevelFilter('3')}
            >
              🌙 Monte Moon
            </button>
          </div>

          <button
            type="button"
            className="refresh-scores-btn"
            onClick={fetchScores}
            title="Actualizar tabla de puntuaciones"
          >
            🔄 Actualizar
          </button>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="leaderboard-loading">
            <div className="mini-pokeball-spinner" />
            <p>Consultando el Salón de la Fama...</p>
          </div>
        )}

        {/* Notificación de respaldo si el servidor no está disponible */}
        {error && (
          <div className="api-notice error-notice">
            ⚠️ JSON Server no respondió en el puerto 3000. Mostrando registros locales almacenados.
          </div>
        )}

        {/* Podio visual para el Top 3 */}
        {!loading && top3.length > 0 && selectedLevelFilter === 'all' && (
          <div className="leaderboard-podium-section">
            {/* 2do Lugar */}
            {top3[1] && (
              <div className="podium-card podium-silver">
                <div className="podium-medal">🥈</div>
                <strong className="podium-name">{top3[1].alias}</strong>
                <span className="podium-score">{top3[1].score} pts</span>
                <span className="podium-lvl">Nivel {top3[1].levelId}</span>
              </div>
            )}

            {/* 1er Lugar (Centro, más alto) */}
            {top3[0] && (
              <div className="podium-card podium-gold">
                <div className="crown-icon">👑</div>
                <div className="podium-medal">🥇</div>
                <strong className="podium-name">{top3[0].alias}</strong>
                <span className="podium-score">{top3[0].score} pts</span>
                <span className="podium-lvl">Nivel {top3[0].levelId}</span>
              </div>
            )}

            {/* 3er Lugar */}
            {top3[2] && (
              <div className="podium-card podium-bronze">
                <div className="podium-medal">🥉</div>
                <strong className="podium-name">{top3[2].alias}</strong>
                <span className="podium-score">{top3[2].score} pts</span>
                <span className="podium-lvl">Nivel {top3[2].levelId}</span>
              </div>
            )}
          </div>
        )}

        {/* Mensaje de tabla vacía */}
        {!loading && processedScores.length === 0 && (
          <div className="empty-scores">
            <p className="muted">No se encontraron puntuaciones para este filtro.</p>
            <p>¡Completa esta ruta para ser el primero en el ranking!</p>
          </div>
        )}

        {/* Tabla completa de puntuaciones */}
        {!loading && processedScores.length > 0 && (
          <div className="scores-table-wrap">
            <div className="scores-table-header">
              <span>POS</span>
              <span>ENTRENADOR Y RUTA</span>
              <span>ESTADO</span>
              <span>PUNTOS</span>
            </div>
            <div className="scores-rows-container">
              {processedScores.slice(0, 15).map((scoreItem, idx) => (
                <LeaderboardRow
                  key={scoreItem.id || scoreItem.runId || `row-${idx}`}
                  position={idx + 1}
                  score={scoreItem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="leaderboard-actions">
          <Link to="/" className="button">
            🎮 Jugar una Ruta
          </Link>
          <Link to="/game/1" className="button button-secondary">
            ⚔️ Desafiar Ruta 01
          </Link>
        </div>
      </section>
    </main>
  )
}