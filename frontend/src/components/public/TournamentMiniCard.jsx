import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { buildUploadUrl } from '../../services/api';

const STATUS_LABEL = {
  proximo: 'Próximo',
  en_curso: 'En curso',
  finalizado: 'Finalizado',
};

function formatDateRange(start, end) {
  if (!start) return '';
  const opts = { day: 'numeric', month: 'long' };
  const startStr = new Date(start).toLocaleDateString('es-ES', opts);
  if (!end || end === start) return startStr;
  const endStr = new Date(end).toLocaleDateString('es-ES', opts);
  return `${startStr} – ${endStr}`;
}

export default function TournamentMiniCard({ tournament }) {
  return (
    <div className="card tournament-card">
      <img
        src={tournament.image_url ? buildUploadUrl(tournament.image_url) : 'https://placehold.co/96x96/0c1a3a/ffffff?text=Torneo'}
        alt={tournament.title}
      />
      <div className="info">
        <span className={`status-pill ${tournament.status}`}>{STATUS_LABEL[tournament.status] || 'Próximo'}</span>
        <h3>{tournament.title}</h3>
        <div className="meta"><FaCalendarAlt /> {formatDateRange(tournament.start_date, tournament.end_date)}</div>
        {tournament.location && <div className="meta"><FaMapMarkerAlt /> {tournament.location}</div>}
        <Link to="/torneos" className="btn btn-green btn-sm" style={{ marginTop: 8 }}>VER TORNEO</Link>
      </div>
    </div>
  );
}

export { formatDateRange, STATUS_LABEL };
