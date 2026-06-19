import React from 'react';

/**
 * Escudo institucional genérico (diseño original, no asociado a ninguna marca real).
 * Se usa en el navbar, el hero, el footer y el login del panel admin.
 */
export default function ShieldLogo({ size = 46, showText = true }) {
  return (
    <svg width={size} height={(size * 54) / 46} viewBox="0 0 92 108" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M46 4 L86 18 V50 C86 78 68 96 46 104 C24 96 6 78 6 50 V18 Z"
        fill="#0c1a3a"
        stroke="#f5b400"
        strokeWidth="4"
      />
      <circle cx="46" cy="50" r="22" fill="#ffffff" stroke="#0c1a3a" strokeWidth="2" />
      {/* balón estilizado */}
      <g transform="translate(46,50)">
        <polygon points="0,-11 9,-4 6,8 -6,8 -9,-4" fill="#0c1a3a" />
        <path d="M0,-11 L0,-22 M9,-4 L19,-9 M6,8 L11,17 M-6,8 L-11,17 M-9,-4 L-19,-9" stroke="#0c1a3a" strokeWidth="1.4" fill="none" />
      </g>
      {showText && (
        <text x="46" y="84" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f5b400" fontFamily="Arial, sans-serif">
          FUNDACION DEPORTIVA REFEREES
        </text>
      )}
    </svg>
  );
}
