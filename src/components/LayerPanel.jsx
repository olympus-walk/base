import React from 'react';
import { LAYERS, GROUPS } from '../data/layers.js';

export default function LayerPanel({ baseId, setBaseId, state, setState }) {
  const update = (id, patch) => setState(s => {
    const copia = { ...s };
    copia[id] = { ...s[id], ...patch };
    return copia;
  });

  return (
    <div className="layer-panel">
      {Object.entries(GROUPS).map(([gid, gname]) => {
        const items = LAYERS.filter(l => l.group === gid);
        if (!items.length) return null;
        return (
          <div key={gid} className="layer-group">
            <h4>{gname}</h4>
            {items.map(l => l.type === 'tile' ? (
              // Mapas base: radio (solo uno a la vez)
              <label key={l.id}>
                <input type="radio" name="base" checked={baseId === l.id} onChange={() => setBaseId(l.id)} /> {l.name}
              </label>
            ) : (
              // Capas superpuestas: checkbox + opacidad
              <div key={l.id} className="layer">
                <label title={l.source}>
                  <input type="checkbox" checked={state[l.id].visible}
                    onChange={e => update(l.id, { visible: e.target.checked })} /> {l.name}
                </label>
                {state[l.id].visible && l.type !== 'line' && (
                  <input type="range" min="0" max="1" step="0.05" value={state[l.id].opacity}
                    onChange={e => update(l.id, { opacity: +e.target.value })} />
                )}
                {state[l.id].visible && l.legend && (
                  <div className="legend">
                    {l.legend.map(([c, t]) => <span key={t}><i style={{ background: c }} />{t}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}