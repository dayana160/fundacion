import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaImages, FaNewspaper, FaTrophy, FaUsers, FaEnvelope, FaFileInvoiceDollar, FaPhotoVideo, FaUserTie,
} from 'react-icons/fa';
import { Loader } from '../../components/Shared';
import { dashboardService } from '../../services/resources';

const CARDS = [
  { key: 'hero_slides', label: 'Diapositivas del Hero', icon: FaImages, color: '#0c1a3a', to: '/admin/hero' },
  { key: 'services', label: 'Servicios', icon: FaUsers, color: '#3fa34d', to: '/admin/services' },
  { key: 'tournaments', label: 'Torneos', icon: FaTrophy, color: '#dba000', to: '/admin/tournaments' },
  { key: 'news', label: 'Noticias', icon: FaNewspaper, color: '#172c5e', to: '/admin/news' },
  { key: 'gallery', label: 'Fotos en galería', icon: FaPhotoVideo, color: '#3fa34d', to: '/admin/gallery' },
  { key: 'team_members', label: 'Miembros del equipo', icon: FaUserTie, color: '#dba000', to: '/admin/team' },
  { key: 'unread_messages', label: 'Mensajes sin leer', icon: FaEnvelope, color: '#d9483b', to: '/admin/messages' },
  { key: 'unread_quotes', label: 'Cotizaciones sin leer', icon: FaFileInvoiceDollar, color: '#d9483b', to: '/admin/quotes' },
];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getSummary().then(setSummary).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="admin-stats-grid">
        {CARDS.map((c) => (
          <Link to={c.to} key={c.key} className="admin-stat-card" style={{ textDecoration: 'none' }}>
            <div className="ic" style={{ background: c.color }}><c.icon /></div>
            <div>
              <strong>{summary?.[c.key] ?? 0}</strong>
              <span>{c.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header"><h2>Bienvenido al panel de administración</h2></div>
        <div className="panel-body">
          <p className="muted">
            Desde aquí puedes gestionar todo el contenido de la página web: el carrusel de inicio, los servicios,
            torneos, noticias, galería de fotos, estadísticas, el equipo, la configuración general del sitio y
            revisar los mensajes y solicitudes que envían los visitantes. Usa el menú lateral para navegar entre
            las secciones.
          </p>
        </div>
      </div>
    </div>
  );
}
