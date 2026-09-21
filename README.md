# NEXUS BREAK // Signal Protocol

Videojuego frontend para el Quiz #5 de Desarrollo Web — Frontend. El proyecto combina React, Vite, JavaScript/JSX, React Router, consumo REST mediante json-server y una automatización n8n conectada al cierre de cada partida.

## Concepto

NEXUS BREAK es un quiz arcade de 8 rondas. El jugador introduce un alias, elige un protocolo de juego y responde preguntas bajo presión de tiempo. Las respuestas correctas generan puntuación base, bonus por racha y bonus por tiempo restante. Al terminar, la ejecución se guarda en db.json mediante POST y el frontend envía el resultado a un webhook n8n.

## Stack

- React + JSX
- Vite
- JavaScript
- React Router
- ESLint flat config
- json-server
- n8n Webhook

## Rutas

- / — Arena e identificación del jugador
- /play/:mode — Partida; :mode es un parámetro dinámico
- /results/:runId — Resultado persistido de una partida
- /leaderboard — Ranking consultado desde la API
- * — Ruta 404

## API local

Instala dependencias y ejecuta el API:

```bash
npm install
npm run server
```

La API queda disponible en http://localhost:3000.

Recursos principales:

- GET /questions?mode=rapid
- GET /questions?mode=precision
- GET /scores/:id
- GET /scores?_sort=-score&_per_page=10
- POST /scores

El código normaliza tanto respuestas de colecciones en forma de arreglo como respuestas paginadas de json-server v1.

## Frontend

En otra terminal:

```bash
npm run dev
```

## Variables de entorno

Copia .env.example como .env y ajusta las URLs:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/game-complete
```

## n8n

El workflow definitivo debe usar:

Webhook POST → Validación/normalización → IF/Switch → Acción final → Respond to Webhook

El frontend envía el evento game.completed desde src/services/n8n.js. El archivo n8n/workflow-game-complete.json es un placeholder y debe reemplazarse por el export real de n8n una vez configurado.

## Lint y build

```bash
npm run lint
npm run build
```

## Estructura

```text
src/
  app/
  components/
  data/
  hooks/
  pages/
  services/
  App.jsx
  index.css
  main.jsx
db.json
n8n/
.env.example
eslint.config.js
vite.config.js
```
