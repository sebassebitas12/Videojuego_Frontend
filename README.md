# Pokemon Route Run

Minijuego 2D de plataformas para evaluación de Frontend, inspirado en una ruta Pokemon clásica.

## Estado actual

La base ya es jugable:

- Inicio con alias.
- React Router.
- Nivel lateral de una pantalla.
- Movimiento con A/D o flechas.
- Salto con W, flecha arriba o Space.
- 8 Poké Balls coleccionables.
- 5 Rattata que patrullan y pueden ser saltados.
- 3 vidas.
- Bandera de salida.
- Victoria y derrota.
- Temporizador de 120 segundos.
- Score.
- Results dinámico.
- Leaderboard.
- JSON Server + fallback localStorage.
- Game loop con requestAnimationFrame.
- Componentes y hooks separados.

## Ejecutar

Frontend:

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`.

API opcional:

```bash
npm run server
```

JSON Server usa `http://localhost:3000`.

El juego funciona aunque JSON Server no esté levantado; en ese caso utiliza la configuración local y guarda los scores en localStorage.

## n8n obligatorio

El workflow exportado está en `n8n/pokemon-route-score.json`. En n8n:

1. Importar ese archivo.
2. Activar el workflow.
3. Copiar la URL `POST` del Webhook.
4. Crear un archivo `.env` a partir de `.env.example` y configurar `VITE_N8N_WEBHOOK_URL`.
5. Reiniciar Vite y terminar una partida para enviar el score.

El flujo recibe el resultado, lo valida con un nodo Code, lo ramifica con IF, guarda los scores válidos en JSON Server y responde al frontend. La captura del flujo se agrega manualmente como parte de la entrega.

## Cómo jugar

1. Escribir un alias.
2. Entrar a la ruta.
3. Correr con A/D o flechas.
4. Saltar con W, flecha arriba o Space.
5. Recoger las 8 Poké Balls.
6. Esquivar o saltar sobre los Rattata.
7. Llegar a la bandera antes de que se acabe el tiempo.

## Score

```text
score = (tiempo_restante × 10)
      + (objetos_recolectados × 150)
      - (daño_recibido × 50)
```

El score mínimo es 0.

## Rutas

- `/`
- `/game/:level`
- `/results/:runId`
- `/leaderboard`

## Pendiente de entrega

- Añadir el workflow exportado de n8n y su captura.
- Configurar la URL del webhook en el servicio de resultados.
