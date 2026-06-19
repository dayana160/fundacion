import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaBullseye, FaEye, FaHistory } from 'react-icons/fa';
import { Loader, EmptyState } from '../../components/Shared';
import { teamService } from '../../services/resources';
import { buildUploadUrl } from '../../services/api';

export default function Nosotros() {
  const { config } = useOutletContext();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamService.getPublic().then(setTeam).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Nosotros</h1>
          <p>Conoce la historia, misión y al equipo detrás de nuestra fundación.</p>
        </div>
      </div>

      <div className="section container">
        <div className="about-grid">
          <div className="about-card">
            <FaBullseye size={26} color="#0c1a3a" />
            <h3>Misión</h3>
            <p>{config?.about_mission || 'Próximamente.'}</p>
          </div>
          <div className="about-card">
            <FaEye size={26} color="#0c1a3a" />
            <h3>Visión</h3>
            <p>{config?.about_vision || 'Próximamente.'}</p>
          </div>
          <div className="about-card">
            <FaHistory size={26} color="#0c1a3a" />
            <h3>Nuestra Historia</h3>
            <p>{config?.about_history || 'Próximamente.'}</p>
          </div>
        </div>

        <div className="section-header"><h2>Nuestro Equipo</h2></div>
        {loading ? (
          <Loader />
        ) : team.length === 0 ? (
          <EmptyState message="Agrega a los miembros del equipo desde el panel de administración." />
        ) : (
          <div className="team-grid">
            {team.map((member) => (
              <div className="team-card" key={member.id}>
                {member.photo_url ? (
                  <img src={buildUploadUrl(member.photo_url)} alt={member.name} />
                ) : (
                  <div className="ph" style={{ background: '#e3e6ee' }} />
                )}
                <h4>{member.name}</h4>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
