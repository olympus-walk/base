// ═══════════════════════════════════════════════════════════
// REGISTRO DE CAPAS DE AREO-WALK
// Para agregar una capa: copia un objeto, cambia los datos y listo.
//
// Tipos disponibles:
//   tile  → mapa base en tiles (Mars Trek). Solo una activa a la vez.
//   grid  → capa calculada desde grid.js (pendiente, térmica...)
//   image → imagen PNG/JPG georreferenciada (geología, minerales...)
//   line  → línea de coordenadas (ruta de Curiosity...)
//
// Grupos: base, terreno, geologia, seguridad, mision
// El orden de la lista = orden de dibujo (la última queda encima)
// ═══════════════════════════════════════════════════════════

const T = 'https://trek.nasa.gov/tiles/Mars/EQ';

// Bordes de la zona de trabajo (los mismos de mission.js)
const ZONA = [[-4.80, 137.33], [-4.70, 137.43]];

export const LAYERS = [
  // ───────── MAPAS BASE ─────────
  {
    id: 'viking', group: 'base', type: 'tile',
    name: 'Óptica · Viking color',
    url: `${T}/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg`,
    maxNativeZoom: 7,
    source: 'NASA/JPL Mars Trek',
  },
  {
    id: 'mola', group: 'base', type: 'tile',
    name: 'Topografía · MOLA',
    url: `${T}/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg`,
    maxNativeZoom: 6,
    source: 'NASA/JPL Mars Trek',
  },

  // ───────── TERRENO (calculadas en grid.js) ─────────
  {
    id: 'slope', group: 'terreno', type: 'grid', key: 'slope',
    name: 'Pendiente', visible: true, opacity: 0.6,
    color: (s) => s > 25 ? [220, 30, 30, 200] : s > 15 ? [255, 140, 0, 170] : [40, 200, 120, 90],
    legend: [['#28c878', '≤15°'], ['#ff8c00', '15–25°'], ['#dc1e1e', '>25°']],
    source: 'Derivada del DTM',
  },
  {
    id: 'thermal', group: 'terreno', type: 'grid', key: 'thermal',
    name: 'Térmica (firmeza del suelo)', visible: false, opacity: 0.5,
    color: (t) => [Math.round(255 * (1 - t)), 120, Math.round(255 * t), 150],
    legend: [['#ff7896', 'Polvo suelto'], ['#0078ff', 'Roca firme']],
    source: 'THEMIS (pendiente de conectar)',
  },

  // ───────── GEOLOGÍA (imágenes) ─────────
  {
    id: 'geology', group: 'geologia', type: 'image',
    name: 'Unidades geológicas', visible: false, opacity: 0.5,
    url: '/layers/geology.png',   // archivo en public/layers/
    bounds: ZONA,
    source: 'USGS Astrogeology',
  },

  // ───────── SEGURIDAD ─────────
  {
    id: 'obstacle', group: 'seguridad', type: 'grid', key: 'obstacle',
    name: 'Obstáculos', visible: true, opacity: 1,
    color: (o) => o ? [0, 0, 0, 220] : [0, 0, 0, 0],
    legend: [['#000', 'Roca / bloqueo']],
    source: 'Derivada del DTM',
  },

  // ───────── MISIÓN ─────────
  {
    id: 'curiosity', group: 'mision', type: 'line',
    name: 'Ruta de Curiosity (ejemplo)', visible: false, opacity: 1,
    color: '#ffffff', dash: '6 6',
    positions: [  // ⚠️ coordenadas de ejemplo: reemplazar por las reales
      [-4.795, 137.335], [-4.780, 137.350], [-4.765, 137.368], [-4.750, 137.385],
    ],
    source: 'NASA/JPL-Caltech',
  },

    {
    id: 'minerals', group: 'geologia', type: 'image',
    name: 'Minerales (CRISM)', visible: false, opacity: 0.5,
    url: '/layers/minerales.webp',
    bounds: ZONA,   // ⚠️ provisional: reemplazar por las coordenadas reales de la imagen
    source: 'CRISM / Mars Trek',
  },
];

export const GROUPS = {
  base: 'Mapa base',
  terreno: 'Terreno',
  geologia: 'Geología',
  seguridad: 'Seguridad',
  mision: 'Misión',
};

// Estado inicial: { slope: {visible:true, opacity:0.6}, ... }
export const initialLayerState = () =>
  Object.fromEntries(
    LAYERS.filter(l => l.type !== 'tile')
      .map(l => [l.id, { visible: !!l.visible, opacity: l.opacity ?? 1 }])
  );