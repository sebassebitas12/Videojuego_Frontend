# Realm of Ashes - Dungeon Run

Minijuego 2D top-down para evaluación de Frontend.

## Estado actual

La base ya es jugable:

- Inicio con alias.
- React Router.
- Dungeon de una habitación.
- Movimiento WASD y flechas.
- Dirección del jugador.
- Ataque con Space.
- 3 enemigos con persecución básica.
- 3 vidas y cooldown de daño.
- Llave y salida.
- Victoria y derrota.
- Temporizador de 60 segundos.
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

## Cómo jugar

1. Escribir un alias.
2. Entrar al dungeon.
3. Moverse con WASD o flechas.
4. Presionar Space para atacar al enemigo que esté frente al jugador.
5. Derrotar a los 3 guardianes.
6. Recoger la llave.
7. Llegar a la salida.
8. Terminar antes de que llegue a cero el temporizador.

## Score

```text
score = (tiempo_restante × 10)
      + (enemigos_derrotados × 100)
      - (daño_recibido × 50)
```

El score mínimo es 0.

## Rutas

- `/`
- `/game/:level`
- `/results/:runId`
- `/leaderboard`

## Referencias

- Matthew-SA/zelda-js
- LakshyaSharma207/js-game
- thepeted/dungeon-crawler

Son referencias conceptuales de mecánicas y organización. No se copia código.

## Próximo trabajo

- Integración n8n.
- Workflow exportado.
- Captura del workflow.
- Ajuste de dificultad.
- Pulido final de arte y audio.
