import React, { useState } from 'react'
import { pingN8nWebhook } from '../services/api'

/**
 * Componente N8nModal: Modal interactivo con la guía paso a paso de n8n,
 * verificador de conectividad en vivo y detalles del flujo para la entrega de la rúbrica.
 */
export default function N8nModal({ isOpen, onClose }) {
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const webhookEnvUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || ''
  const [customUrl, setCustomUrl] = useState(webhookEnvUrl)

  if (!isOpen) return null

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    const res = await pingN8nWebhook(customUrl)
    setTestResult(res)
    setTesting(false)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content n8n-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="n8n-badge">AUTOMATIZACIÓN</span>
            <h2>Guía de Configuración n8n</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <section className="n8n-intro-card">
            <p>
              El flujo de <strong>n8n</strong> recibe el puntaje final de la partida mediante un{' '}
              <strong>Webhook POST</strong>, valida los datos mediante código JavaScript (antifraude y formato),
              ramifica con un nodo <strong>IF</strong>, guarda los puntajes válidos en <strong>JSON Server</strong>{' '}
              y responde al frontend.
            </p>
          </section>

          {/* Probador en vivo del webhook */}
          <section className="n8n-tester-box">
            <h3>⚡ Probador de Webhook en Vivo</h3>
            <p className="small-text">
              Verifica si tu instancia de n8n está escuchando peticiones sin necesidad de jugar toda la partida:
            </p>

            <div className="tester-input-group">
              <input
                type="text"
                placeholder="http://localhost:5678/webhook/pokemon-route-score"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="webhook-input"
              />
              <button
                className="button test-btn"
                onClick={handleTest}
                disabled={testing || !customUrl}
              >
                {testing ? 'Probando...' : 'Probar Webhook'}
              </button>
            </div>

            {testResult && (
              <div className={`test-feedback ${testResult.ok ? 'test-success' : 'test-error'}`}>
                <strong>{testResult.ok ? '✅ Éxito:' : '❌ Error:'}</strong> {testResult.message}
                {testResult.data && (
                  <pre className="test-json-preview">{JSON.stringify(testResult.data, null, 2)}</pre>
                )}
              </div>
            )}
          </section>

          {/* Pasos para configurar n8n */}
          <section className="n8n-steps-list">
            <h3>📋 Pasos para cumplir con la Rúbrica (15 puntos)</h3>

            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Iniciar n8n en tu computadora</strong>
                <p>Abre una terminal y ejecuta el siguiente comando:</p>
                <code>npx n8n</code>
                <p className="sub-note">Luego abre tu navegador en <code>http://localhost:5678</code></p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Importar el Flujo de Trabajo</strong>
                <p>En n8n haz clic en <strong>Workflows &gt; Import from File</strong> y selecciona el archivo:</p>
                <code>n8n/pokemon-route-score.json</code>
                <p className="sub-note">El flujo contiene: Webhook &gt; Validar score (Code) &gt; IF (Condición) &gt; Guardar en JSON Server (HTTP) &gt; Responder.</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Copiar la URL del Webhook y Activar</strong>
                <p>
                  Haz doble clic en el nodo <strong>Recibir score</strong>. Copia la URL (puedes usar <em>Production URL</em> para partidas reales o <em>Test URL</em> para depurar). Luego activa el switch <strong>Active</strong> en la esquina superior derecha.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Configurar en el archivo .env</strong>
                <p>Crea o edita tu archivo <code>.env</code> en la raíz del proyecto:</p>
                <code>VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/pokemon-route-score</code>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">5</div>
              <div className="step-content">
                <strong>Levantar JSON Server y Vite</strong>
                <p>Para que n8n pueda guardar en la base de datos local:</p>
                <code>npm run server</code>
                <p className="sub-note">JSON Server correrá en <code>http://localhost:3000</code>.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button className="button" onClick={onClose}>
            Entendido, volver al juego
          </button>
        </div>
      </div>
    </div>
  )
}
