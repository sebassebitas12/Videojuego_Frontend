import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button'
import TrainerSprite from '../components/sprites/TrainerSprite'
import BallSprite from '../components/sprites/BallSprite'
import PokemonSprite from '../components/sprites/PokemonSprite'
import N8nModal from '../components/N8nModal'
import { fallbackLevels } from '../data/fallbackLevel'

export default function Home() {
  const [alias, setAlias] = useState(() => sessionStorage.getItem('playerAlias') || '')
  const [selectedLevelId, setSelectedLevelId] = useState(1)
  const [isN8nOpen, setIsN8nOpen] = useState(false)
  const navigate = useNavigate()

  function start(e) {
    e.preventDefault()
    const finalAlias = alias.trim() || 'Ash Ketchum'
    sessionStorage.setItem('playerAlias', finalAlias)
    navigate(`/game/${selectedLevelId}`)
  }

  const selectedLevel = fallbackLevels.find((l) => l.id === selectedLevelId) || fallbackLevels[0]

  return (
    <main className="screen home-screen">
      <section className="hero panel home-panel">
        <div className="home-top-badge">
          <span className="eyebrow">POKÉMON ADVENTURE • KANTO REGION</span>
          <button
            type="button"
            className="n8n-info-pill"
            onClick={() => setIsN8nOpen(true)}
            title="Configurar y probar el Webhook de n8n"
          >
            ⚡ Guía n8n & Webhook
          </button>
        </div>

        <h1 className="home-title">POKÉMON ROUTE RUN</h1>
        <p className="lead">
          Conviértete en el mejor Entrenador Pokémon. Corre a través de las rutas de Kanto,
          recolecta todas las Poké Balls, esquiva o derrota a los Pokémon salvajes y alcanza la meta antes de que se agote el tiempo.
        </p>

        <form onSubmit={start} className="start-form">
          {/* Vista previa del Entrenador */}
          <div className="trainer-preview-box">
            <div className="trainer-avatar-render">
              <TrainerSprite direction="right" isMoving={true} />
            </div>
            <div className="trainer-field">
              <label htmlFor="alias">Nombre del Entrenador</label>
              <input
                id="alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                maxLength={16}
                placeholder="Ej: Ash Ketchum"
                autoFocus
              />
            </div>
          </div>

          {/* Selector de Niveles */}
          <div className="level-selection-section">
            <label className="section-label">Selecciona la Ruta / Nivel:</label>
            <div className="level-cards-grid">
              {fallbackLevels.map((lvl) => {
                const isSelected = lvl.id === selectedLevelId
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    className={`level-choice-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedLevelId(lvl.id)}
                  >
                    <div className="level-card-header">
                      <span className="level-num">NIVEL 0{lvl.id}</span>
                      <div className="level-ball-mini">
                        <BallSprite type={lvl.ballType || 'pokeball'} />
                      </div>
                    </div>
                    <strong className="level-name">{lvl.name}</strong>
                    <span className="level-subtitle">{lvl.subtitle}</span>

                    <div className="level-card-footer">
                      <span className="level-stat">⏱ {lvl.timeLimit}s</span>
                      <span className="level-stat">🔴 {lvl.collectibles.length} balls</span>
                      <span className="level-stat">🐾 {lvl.enemies.length} pokémon</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="form-action-group">
            <Button type="submit" className="play-button-primary">
              ¡Comenzar Aventura en {selectedLevel.name}!
            </Button>
            <Link to="/leaderboard" className="button button-secondary">
              🏆 Ver Leaderboard
            </Link>
          </div>
        </form>

        {/* Resumen de mecánicas */}
        <div className="rules-bar">
          <div className="rule-item">
            <span className="rule-icon">❤️</span> <strong>3 Vidas</strong>
          </div>
          <div className="rule-item">
            <span className="rule-icon">👟</span> <strong>A/D Correr, W Saltar</strong>
          </div>
          <div className="rule-item">
            <span className="rule-icon">💥</span> <strong>Salta sobre enemigos para derrotarlos</strong>
          </div>
          <div className="rule-item">
            <span className="rule-icon">🏁</span> <strong>Desbloquea la meta con todas las Poké Balls</strong>
          </div>
        </div>
      </section>

      {/* Modal de n8n interactivo */}
      <N8nModal isOpen={isN8nOpen} onClose={() => setIsN8nOpen(false)} />
    </main>
  )
}