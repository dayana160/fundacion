import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="section container text-center" style={{ padding: '100px 0' }}>
      <h1 style={{ fontSize: '3rem', color: '#0c1a3a' }}>404</h1>
      <p className="muted">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-navy">Volver al inicio</Link>
    </div>
  );
}
