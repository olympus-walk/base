import React from 'react';
export default function Profile({ data }) {
  if (!data?.length) return null;
  const W = 300, H = 80, min = Math.min(...data), max = Math.max(...data), span = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / span) * (H - 10) - 5}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="profile">
      <polyline points={`0,${H} ${pts} ${W},${H}`} fill="rgba(0,229,255,.15)" stroke="#00e5ff" strokeWidth="1.5" />
      <text x="4" y="12">{max.toFixed(0)} m</text><text x="4" y={H - 4}>{min.toFixed(0)} m</text>
    </svg>
  );
}
