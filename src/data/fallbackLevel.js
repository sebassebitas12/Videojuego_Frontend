/**
 * Datos de niveles con medidas exactas y calibradas (virtual 540px de alto).
 * Alturas de entidades:
 * - Entrenador: alto 48px, ancho 36px
 * - Rattata: alto 32px, ancho 44px
 * - Pidgey: alto 36px, ancho 42px (volador)
 * - Zubat: alto 34px, ancho 46px (volador)
 * - Poké Ball: 28px x 28px
 * - Meta (Bandera): alto 70px, ancho 46px
 * 
 * Regla de colisión perfecta: Si la plataforma está en y = Py,
 * la entidad apoyada debe estar en y = Py - alto.
 */

export const fallbackLevels = [
  {
    id: 1,
    name: 'Ruta 01: Pueblo Paleta',
    subtitle: 'Ruta clásica de hierba hacia Ciudad Verde',
    theme: 'route1',
    ballType: 'pokeball',
    width: 2400,
    height: 540,
    timeLimit: 120,
    // Suelo base está en y = 470. Entrenador (48px) inicia en y = 470 - 48 = 422
    player: { x: 80, y: 422, width: 36, height: 48 },
    // Meta en y = 470 - 70 = 400
    goal: { x: 2280, y: 400, width: 46, height: 70 },
    platforms: [
      // Suelo continuo principal
      { x: 0, y: 470, width: 2400, height: 70, type: 'grass-ground' },
      
      // Plataformas elevadas con distancias naturales y alcanzables (salto máximo ~110px)
      // Plataforma 1: subida suave desde el suelo (470 -> 390 = 80px)
      { x: 180, y: 390, width: 170, height: 26, type: 'grass' },
      // Plataforma 2: segundo escalón (390 -> 310 = 80px)
      { x: 420, y: 310, width: 180, height: 26, type: 'grass' },
      // Plataforma 3: bajada hacia puente de madera
      { x: 680, y: 380, width: 160, height: 26, type: 'grass' },
      // Plataforma 4: altura intermedia
      { x: 920, y: 320, width: 180, height: 26, type: 'grass' },
      // Plataforma 5: mirador alto
      { x: 1180, y: 250, width: 190, height: 26, type: 'grass' },
      // Plataforma 6: descenso
      { x: 1450, y: 330, width: 180, height: 26, type: 'grass' },
      // Plataforma 7: escalón previo a colina
      { x: 1710, y: 390, width: 170, height: 26, type: 'grass' },
      // Plataforma 8: colina final antes de la bandera
      { x: 1960, y: 320, width: 190, height: 26, type: 'grass' },
    ],
    collectibles: [
      // Poké Balls flotando 34px sobre las plataformas o suelo
      { id: 'ball-1', x: 250, y: 350, type: 'pokeball', width: 28, height: 28 },
      { id: 'ball-2', x: 500, y: 270, type: 'pokeball', width: 28, height: 28 },
      { id: 'ball-3', x: 750, y: 340, type: 'pokeball', width: 28, height: 28 },
      { id: 'ball-4', x: 1000, y: 280, type: 'pokeball', width: 28, height: 28 },
      { id: 'ball-5', x: 1260, y: 210, type: 'pokeball', width: 28, height: 28 },
      { id: 'ball-6', x: 1530, y: 290, type: 'pokeball', width: 28, height: 28 },
      { id: 'ball-7', x: 1780, y: 350, type: 'pokeball', width: 28, height: 28 },
      { id: 'ball-8', x: 2040, y: 280, type: 'pokeball', width: 28, height: 28 },
    ],
    enemies: [
      // Rattata (alto 32px). En suelo y=470 -> y=438. En plataforma y=390 -> y=358
      { id: 'rattata-1', type: 'rattata', x: 340, y: 438, width: 44, height: 32, direction: -1, minX: 100, maxX: 600 },
      { id: 'rattata-2', type: 'rattata', x: 720, y: 348, width: 44, height: 32, direction: 1, minX: 680, maxX: 810 },
      { id: 'rattata-3', type: 'rattata', x: 1100, y: 438, width: 44, height: 32, direction: -1, minX: 950, maxX: 1400 },
      { id: 'rattata-4', type: 'rattata', x: 1500, y: 298, width: 44, height: 32, direction: 1, minX: 1450, maxX: 1600 },
      { id: 'rattata-5', type: 'rattata', x: 1850, y: 438, width: 44, height: 32, direction: -1, minX: 1700, maxX: 2200 },
    ],
  },
  {
    id: 2,
    name: 'Bosque Verde: Travesía Esmeralda',
    subtitle: 'Caminos de madera entre las copas de los árboles',
    theme: 'forest',
    ballType: 'greatball',
    width: 2700,
    height: 540,
    timeLimit: 115,
    player: { x: 80, y: 422, width: 36, height: 48 },
    goal: { x: 2580, y: 400, width: 46, height: 70 },
    platforms: [
      // Suelo base cubierto de musgo y raíces
      { x: 0, y: 470, width: 2700, height: 70, type: 'forest-ground' },
      
      // Puentes y tablas de madera en las ramas
      { x: 180, y: 380, width: 180, height: 24, type: 'wood' },
      { x: 440, y: 295, width: 190, height: 24, type: 'wood' },
      { x: 720, y: 220, width: 180, height: 24, type: 'wood' },
      { x: 990, y: 310, width: 190, height: 24, type: 'wood' },
      { x: 1260, y: 390, width: 170, height: 24, type: 'wood' },
      { x: 1510, y: 300, width: 200, height: 24, type: 'wood' },
      { x: 1790, y: 215, width: 180, height: 24, type: 'wood' },
      { x: 2060, y: 305, width: 190, height: 24, type: 'wood' },
      { x: 2330, y: 390, width: 180, height: 24, type: 'wood' },
    ],
    collectibles: [
      { id: 'gball-1', x: 260, y: 340, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-2', x: 520, y: 255, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-3', x: 800, y: 180, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-4', x: 1070, y: 270, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-5', x: 1330, y: 350, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-6', x: 1600, y: 260, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-7', x: 1870, y: 175, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-8', x: 2140, y: 265, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-9', x: 2410, y: 350, type: 'greatball', width: 28, height: 28 },
      { id: 'gball-10', x: 1200, y: 430, type: 'greatball', width: 28, height: 28 },
    ],
    enemies: [
      // Rattata en suelo (y = 470 - 32 = 438)
      { id: 'rattata-f1', type: 'rattata', x: 340, y: 438, width: 44, height: 32, direction: 1, minX: 150, maxX: 650 },
      // Pidgey volador (alto 36px) patrullando el cielo entre árboles
      { id: 'pidgey-1', type: 'pidgey', x: 540, y: 230, width: 42, height: 36, direction: -1, minX: 400, maxX: 700, isFlying: true },
      { id: 'rattata-f2', type: 'rattata', x: 1100, y: 438, width: 44, height: 32, direction: -1, minX: 900, maxX: 1400 },
      { id: 'pidgey-2', type: 'pidgey', x: 1600, y: 235, width: 42, height: 36, direction: 1, minX: 1400, maxX: 1780, isFlying: true },
      { id: 'pidgey-3', type: 'pidgey', x: 1900, y: 150, width: 42, height: 36, direction: -1, minX: 1720, maxX: 2150, isFlying: true },
      { id: 'rattata-f3', type: 'rattata', x: 2200, y: 438, width: 44, height: 32, direction: 1, minX: 1950, maxX: 2500 },
    ],
  },
  {
    id: 3,
    name: 'Monte Moon: Caverna de las Estrellas',
    subtitle: 'Cornisas de piedra lunar y murciélagos Zubat',
    theme: 'cave',
    ballType: 'ultraball',
    width: 2900,
    height: 540,
    timeLimit: 105,
    player: { x: 80, y: 422, width: 36, height: 48 },
    goal: { x: 2780, y: 400, width: 46, height: 70 },
    platforms: [
      // Suelo cavernoso de piedra
      { x: 0, y: 470, width: 2900, height: 70, type: 'cave-ground' },
      
      // Plataformas de roca flotantes
      { x: 160, y: 380, width: 160, height: 26, type: 'rock' },
      { x: 390, y: 295, width: 170, height: 26, type: 'rock' },
      { x: 650, y: 360, width: 160, height: 26, type: 'rock' },
      { x: 900, y: 270, width: 180, height: 26, type: 'rock' },
      { x: 1170, y: 350, width: 160, height: 26, type: 'rock' },
      { x: 1420, y: 250, width: 190, height: 26, type: 'rock' },
      { x: 1710, y: 330, width: 170, height: 26, type: 'rock' },
      { x: 1980, y: 240, width: 180, height: 26, type: 'rock' },
      { x: 2240, y: 315, width: 180, height: 26, type: 'rock' },
      { x: 2510, y: 385, width: 170, height: 26, type: 'rock' },
    ],
    collectibles: [
      { id: 'uball-1', x: 230, y: 340, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-2', x: 460, y: 255, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-3', x: 720, y: 320, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-4', x: 980, y: 230, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-5', x: 1240, y: 310, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-6', x: 1500, y: 210, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-7', x: 1780, y: 290, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-8', x: 2060, y: 200, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-9', x: 2310, y: 275, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-10', x: 2580, y: 345, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-11', x: 840, y: 430, type: 'ultraball', width: 28, height: 28 },
      { id: 'uball-12', x: 1860, y: 430, type: 'ultraball', width: 28, height: 28 },
    ],
    enemies: [
      // Zubat (alto 34px) volando en oscilación
      { id: 'zubat-1', type: 'zubat', x: 350, y: 210, width: 46, height: 34, direction: 1, minX: 180, maxX: 600, isFlying: true },
      { id: 'rattata-m1', type: 'rattata', x: 550, y: 438, width: 44, height: 32, direction: -1, minX: 300, maxX: 750 },
      { id: 'zubat-2', type: 'zubat', x: 960, y: 190, width: 46, height: 34, direction: -1, minX: 800, maxX: 1150, isFlying: true },
      { id: 'zubat-3', type: 'zubat', x: 1470, y: 170, width: 46, height: 34, direction: 1, minX: 1300, maxX: 1700, isFlying: true },
      { id: 'rattata-m2', type: 'rattata', x: 1650, y: 438, width: 44, height: 32, direction: 1, minX: 1350, maxX: 1900 },
      { id: 'zubat-4', type: 'zubat', x: 2100, y: 165, width: 46, height: 34, direction: -1, minX: 1900, maxX: 2350, isFlying: true },
      { id: 'rattata-m3', type: 'rattata', x: 2400, y: 438, width: 44, height: 32, direction: -1, minX: 2150, maxX: 2700 },
    ],
  },
]

export const fallbackLevel = fallbackLevels[0]