import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Loader, EmptyState } from '../../components/Shared';
import { tournamentService } from '../../services/resources';
import { buildUploadUrl } from '../../services/api';
import { formatDateRange, STATUS_LABEL } from '../../components/public/TournamentMiniCard';

export default function Torneos() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tournamentService.getPublic().then(setTournaments).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Torneos</h1>
          <p>Conoce las competencias en las que participan nuestros deportistas.</p>
        </div>
      </div>

      <div className="section container">
        {loading ? (
          <Loader />
        ) : tournaments.length === 0 ? (
          <EmptyState message="Agrega torneos desde el panel de administración." />
        ) : (
          <div className="tournaments-list">
            {tournaments.map((t) => (
              <div className="tournament-row" key={t.id}>
                <img
                  src={t.image_url ? buildUploadUrl(t.image_url) : 'https://placehold.co/220x130/0c1a3a/ffffff?text=Torneo'}
                  alt={t.title}
                />
                <div>
                  <span className={`status-pill ${t.status}`}>{STATUS_LABEL[t.status] || 'Próximo'}</span>
                  <h3>{t.title}</h3>
                  <div className="meta-row">
                    <span><FaCalendarAlt /> {formatDateRange(t.start_date, t.end_date)}</span>
                    {t.location && <span><FaMapMarkerAlt /> {t.location}</span>}
                  </div>
                  <p>{t.description}</p>
                </div>
                {t.registration_link ? (
                  <a href={t.registration_link} target="_blank" rel="noreferrer" className="btn btn-green">INSCRIBIRSE</a>
                ) : (
                  <span />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
