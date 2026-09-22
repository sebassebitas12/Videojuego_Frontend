# Pokémon Route Run 🔴⚡

Minijuego 2D de plataformas desarrollado en **React + Vite**, inspirado en las rutas clásicas de la región de Kanto de Pokémon. Creado como solución completa para la evaluación del **Quiz #5: Videojuego con React + Consumo de Datos y Flujo de n8n** (100 puntos).

---

## 📋 Cumplimiento de la Rúbrica de Evaluación

| Criterio | Puntos | Implementación en este Proyecto |
| :--- | :---: | :--- |
| **2.1 Componentes** | **15 pts** | Arquitectura modular con componentes reutilizables: `GameBoard`, `HUD`, `TrainerSprite`, `PokemonSprite`, `BallSprite`, `GoalFlag`, `LeaderboardRow`, `N8nModal`, `Button`, `GameControls`. Paso riguroso de props padre-hijo y renderizado de listas con `key` única y estable. |
| **2.2 Estados y Hooks** | **20 pts** | Estado inmutable gestionado con `useState` (vidas, puntaje, tiempo, nivel, estado de la partida). Efectos secundarios con `useEffect` (carga asíncrona de niveles, sincronización de webhook, timers). Hooks adicionales: `useRef` (game loop sin re-renders superfluos), `useCallback` (cálculo de colisiones y físicas a 60 FPS) y `useMemo` (métricas de progreso del nivel y decoraciones de fondo). |
| **2.3 Rutas (React Router)** | **15 pts** | Mínimo 4 rutas implementadas: Inicio (`/`), Nivel de juego con parámetro dinámico (`/game/:level`), Resultados dinámicos (`/results/:runId`), Salón de la Fama (`/leaderboard`) y página 404 (`/404`). Navegación fluida con `Link` y navegación programática con `useNavigate`. |
| **2.4 Consumo de Datos** | **20 pts** | Operaciones de lectura `GET` (`/levels/:id` y `/scores`) y escritura `POST` (`/scores`). Servido localmente mediante `json-server` (`db.json`) con respaldo resiliente a `localStorage` si el servidor está apagado. Indicadores visibles de carga (spinners) y manejo amigable de errores. |
| **3. Flujo de n8n** | **15 pts** | Workflow funcional exportado en `n8n/pokemon-route-score.json` con Webhook Trigger, validación mediante nodo JavaScript Code, bifurcación condicional IF, persistencia vía HTTP Request a JSON Server y respuesta al frontend. Frontend configurado con `POST` en `/results` y herramienta de prueba en vivo. |
| **Funcionalidad del Juego** | **10 pts** | Jugabilidad completa de inicio a fin: selector de 3 niveles progresivos, físicas de salto, derrota de enemigos al caer sobre ellos, recolección de Poké Balls, meta interactiva y avance al siguiente nivel. |
| **Repositorio y Documentación**| **5 pts** | Documentación exhaustiva en este `README.md` y guía paso a paso en `docs/N8N_TUTORIAL.md`. |

---

## 🎮 Características del Juego

1. **Personajes y Sprites Reales de Pokémon**:
   - **Entrenador (Red / Ash Ketchum)**: Con gorra oficial de la Liga Añil, chaqueta roja, mochila y animaciones dinámicas de carrera, salto y daño.
   - **Rattata**: Roedor morado con bigotes, orejas rosadas y cola animada que patrulla en el suelo.
   - **Pidgey**: Pájaro volador con plumaje detallado y aleteo continuo.
   - **Zubat**: Murciélago cavernoso con alas membranosas y colmillos.
   - **Poké Balls 3D**: Poké Ball clásica, Super Ball (Great Ball) y Ultra Ball con brillo pulsante central.
   - **Meta**: Banderín oficial de la Liga Pokémon que se desbloquea al recolectar todas las Poké Balls.

2. **3 Niveles Temáticos con Fondos Vivos**:
   - **Nivel 1: Ruta 01 - Pueblo Paleta**: Día soleado, nubes flotantes animadas, colinas de Kanto, árboles y flores.
   - **Nivel 2: Bosque Verde (Viridian Forest)**: Niebla esmeralda, árboles gigantes, rayos de sol filtrados y plataformas de madera.
   - **Nivel 3: Monte Moon (Cueva Lunar)**: Caverna crepuscular con cristales lunares resplandecientes y estalagmitas.

---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Clonar e Instalar dependencias
```bash
npm install
```

### 2. Iniciar el Frontend (Vite)
```bash
npm run dev
```
Abre tu navegador en: [http://localhost:5173](http://localhost:5173).

### 3. Iniciar JSON Server (Base de Datos Local)
En una segunda terminal:
```bash
npm run server
```
JSON Server servirá `db.json` en [http://localhost:3000](http://localhost:3000).

---

## ⚡ Configuración del Flujo de n8n (Obligatorio)

El workflow exportado se encuentra en:
`n8n/pokemon-route-score.json`

### URL del Webhook
- **URL por defecto configurada:**
  `http://localhost:5678/webhook/pokemon-route-score`

### Pasos rápidos para activar n8n:
1. En una tercera terminal, ejecuta:
   ```bash
   npx n8n
   ```
2. Abre [http://localhost:5678](http://localhost:5678).
3. Importa el archivo `n8n/pokemon-route-score.json`.
4. Activa el workflow con el switch **Active**.
5. Crea un archivo `.env` en la raíz (o usa `.env.example`):
   ```env
   VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/pokemon-route-score
   VITE_API_BASE_URL=http://localhost:3000
   ```
6. Puedes verificar la conexión en cualquier momento haciendo clic en el botón **⚡ n8n Webhook** en el menú de la aplicación.
7. Consulta la guía completa y detallada en [docs/N8N_TUTORIAL.md](docs/N8N_TUTORIAL.md).

---

## 🕹️ Controles

- <kbd>A</kbd> o <kbd>Flecha Izquierda</kbd>: Moverse a la izquierda.
- <kbd>D</kbd> o <kbd>Flecha Derecha</kbd>: Moverse a la derecha.
- <kbd>W</kbd>, <kbd>Espacio</kbd> o <kbd>Flecha Arriba</kbd>: Saltar.
- **Mecánica de combate:** Salta sobre los Pokémon enemigos desde arriba para derrotarlos y ganar puntos adicionales (+50 pts).
- **Controles táctiles:** Botones táctiles disponibles automáticamente en pantallas móviles o tablets.

---

## 📊 Sistema de Puntuación (Score)

$$\text{Score} = (\text{Tiempo Restante} \times 10) + (\text{Poké Balls} \times 150) - (\text{Daño Recibido} \times 50)$$

- Puntaje mínimo: 0 pts.
- Si derrotas enemigos antes de llegar a la meta, aseguras la ruta para recolectar las Poké Balls con mayor facilidad.
