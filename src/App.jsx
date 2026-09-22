import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Results from './pages/Results'
import Leaderboard from './pages/Leaderboard'
import N8nModal from './components/N8nModal'

function NotFound() {
  return (
    <main className="screen center">
      <section className="panel">
        <p className="eyebrow">ERROR 404</p>
        <h1>Ruta desconocida</h1>
        <p className="lead">Parece que te has perdido en la hierba alta. Esta ruta no existe en el mapa de Kanto.</p>
        <Link className="button" to="/">
          Volver a Pueblo Paleta
        </Link>
      </section>
    </main>
  )
}

export default function App() {
  const [isN8nModalOpen, setIsN8nModalOpen] = useState(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-brand-group">
          <Link className="brand" to="/">
            <span className="brand-ball">🔴</span> POKÉMON ROUTE RUN
          </Link>
        </div>

        <div className="nav-links-group">
          <button
            type="button"
            className="nav-n8n-btn"
            onClick={() => setIsN8nModalOpen(true)}
            title="Ver guía y probador del webhook n8n"
          >
            ⚡ n8n Webhook
          </button>
          <Link to="/leaderboard" className="nav-link">
            🏆 Leaderboard
          </Link>
          <Link to="/" className="nav-link">
            🎮 Inicio
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:level" element={<Game />} />
        <Route path="/results/:runId" element={<Results />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>

      <N8nModal isOpen={isN8nModalOpen} onClose={() => setIsN8nModalOpen(false)} />
    </>
  )
}