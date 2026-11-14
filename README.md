# AREO-WALK · Marswalk Planner (Gale / Monte Sharp)
npm install
npm run dev

## Archivos que cada uno toca
- src/data/mission.js  → coordenadas reales, puntos, fotos de Curiosity, límites (Personas 1 y 5)
- src/lib/grid.js      → reemplazar generateGrid() por grid.json del HiRISE DTM (Persona 1)
- src/lib/astar.js     → costo de ruta, tiempo, radiación (Persona 2)
- src/components/MarsMap.jsx, src/data/layers.js → capas Mars Trek (Persona 3)
- src/components/HUD.jsx, styles.css → interfaz y HUD (Persona 4)
