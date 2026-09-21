# Realm of Ashes - Dungeon Run

## Base implementada

La rama principal contiene una base React + Vite + JavaScript/JSX para el minijuego.

### Rutas
- / - inicio y alias
- /game/:level - dungeon dinámico
- /results/:runId - resultado dinámico
- /leaderboard - ranking

### Componentes
Button, HUD, Entity y LeaderboardRow.

### API
json-server:
- GET /levels/:id
- GET /scores
- POST /scores

### Referencias
Se documentan como inspiración conceptual:
- Matthew-SA/zelda-js
- LakshyaSharma207/js-game
- thepeted/dungeon-crawler

No se copia código de esos proyectos.

### Score
score = tiempo_restante * 10 + enemigos_derrotados * 100 - daño_recibido * 50

## Probar

Frontend solamente:
npm install
npm run dev

Para API y leaderboard persistente, en otra terminal:
npm run server

Luego:
http://localhost:5173

## Siguiente fase
1. Validar la base.
2. Mejorar colisiones y game loop con requestAnimationFrame/useRef.
3. Completar persistencia.
4. Integrar n8n.
5. Añadir arte/audio y pulido visual.
