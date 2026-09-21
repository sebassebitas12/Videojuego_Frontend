import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Results from './pages/Results'
import Leaderboard from './pages/Leaderboard'
function NotFound(){return <main className="screen center"><section className="panel"><p className="eyebrow">404</p><h1>Ruinas desconocidas</h1><p>La ruta solicitada no existe.</p><Link className="button" to="/">Volver al inicio</Link></section></main>}
export default function App(){return <><nav className="nav"><Link className="brand" to="/">REALM OF ASHES</Link><Link to="/leaderboard">Leaderboard</Link></nav><Routes><Route path="/" element={<Home/>}/><Route path="/game/:level" element={<Game/>}/><Route path="/results/:runId" element={<Results/>}/><Route path="/leaderboard" element={<Leaderboard/>}/><Route path="*" element={<Navigate to="/404" replace/>}/><Route path="/404" element={<NotFound/>}/></Routes></>}