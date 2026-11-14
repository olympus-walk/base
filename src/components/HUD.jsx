import React, { useEffect, useState } from 'react';
// Simulación del visor del casco: avanza sobre la ruta calculada.
export default function HUD({ route, waypoints, limits, onExit }) {
  const [t, setT] = useState(0); // 0..1 progreso
  useEffect(() => { const id = setInterval(() => setT(v => Math.min(1, v + 0.004)), 200); return () => clearInterval(id); }, []);
  if (!route?.latlngs) return <div className="hud"><p>Calcula una ruta primero.</p><button onClick={onExit}>Salir</button></div>;
  const hours = route.hours * t, dose = route.dose * t;
  const legIdx = Math.min(route.legs.length - 1, Math.floor(t * route.legs.length));
  const leg = route.legs[legIdx];
  const remainKm = route.distKm * (1 - t);
  const mustReturn = hours > limits.maxEvaHours * 0.7 || dose > limits.maxEvaDoseMicroGy * 0.7;
  return (
    <div className="hud">
      <div className="hud-top"><span>EVA {hours.toFixed(2)} h</span><span>O₂ {(100 - t * 70).toFixed(0)}%</span><span>☢ {dose.toFixed(1)} µGy</span></div>
      <div className="hud-center">
        <div className="compass">▲<small>{leg.to}</small></div>
        <h2>{leg.from} → {leg.to}</h2>
        <p>Restante: {remainKm.toFixed(2)} km · Pend. máx tramo {leg.maxSlope.toFixed(0)}°</p>
      </div>
      {mustReturn && <div className="hud-alert">⚠ PUNTO DE NO RETORNO CERCANO — INICIAR REGRESO</div>}
      <div className="hud-bottom"><input type="range" min="0" max="1" step="0.01" value={t} onChange={e => setT(+e.target.value)} />
        <button onClick={onExit}>Salir del HUD</button></div>
    </div>
  );
}
