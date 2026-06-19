import React, { useEffect, useState } from 'react';
import { Loader, EmptyState } from '../../components/Shared';
import { getIconComponent } from '../../components/iconMap';
import { statService } from '../../services/resources';

export default function Estadisticas() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statService.getPublic().then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Estadísticas</h1>
          <p>Los números que reflejan el impacto de nuestro trabajo.</p>
        </div>
      </div>

      <div className="section container">
        {loading ? (
          <Loader />
        ) : stats.length === 0 ? (
          <EmptyState message="Agrega estadísticas desde el panel de administración." />
        ) : (
          <div className="stats-grid">
            {stats.map((s) => {
              const Icon = getIconComponent(s.icon);
              return (
                <div className="stat-card" key={s.id}>
                  <div className="icon"><Icon /></div>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
