import React, { useEffect, useState } from 'react';
import { Loader, EmptyState } from '../../components/Shared';
import { getIconComponent } from '../../components/iconMap';
import { serviceService } from '../../services/resources';
import { buildUploadUrl } from '../../services/api';

export default function Servicios() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceService.getPublic()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
        }

        .service-page-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(0,0,0,.09);
          transition: transform .3s, box-shadow .3s;
          display: flex;
          flex-direction: column;
        }

        .service-page-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,.14);
        }

        /* Imagen: altura fija cómoda para verse bien */
        .service-image {
          width: 100%;
          height: 260px;
          background: #f0f2f8;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform .4s ease;
        }

        .service-page-card:hover .service-image img {
          transform: scale(1.04);
        }

        /* Portada con icono si no hay imagen */
        .service-icon-cover {
          width: 100%;
          height: 260px;
          background: linear-gradient(135deg, #0c1a3a 60%, #1a3270 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          color: #c9a84c;
        }

        .service-page-card .body {
          padding: 22px 24px 26px;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 12px;
          background: #0c1a3a;
          color: white;
          font-size: 1.15rem;
          flex-shrink: 0;
        }

        .service-page-card h3 {
          color: #0c1a3a;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .muted {
          color: #666;
          line-height: 1.6;
          font-size: 0.88rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .service-image,
          .service-icon-cover { height: 200px; }
        }
      `}</style>

      <div>
        <div className="page-header">
          <div className="container">
            <h1>Nuestros Servicios</h1>
            <p>Programas integrales pensados para el desarrollo deportivo y humano.</p>
          </div>
        </div>

        <div className="section container">
          {loading ? (
            <Loader />
          ) : services.length === 0 ? (
            <EmptyState message="Agrega servicios desde el panel de administración." />
          ) : (
            <div className="services-grid">
              {services.map((s) => {
                const Icon = getIconComponent(s.icon);
                return (
                  <div className="service-page-card" key={s.id}>

                    {s.image_url ? (
                      <div className="service-image">
                        <img src={buildUploadUrl(s.image_url)} alt={s.title} />
                      </div>
                    ) : (
                      <div className="service-icon-cover">
                        <Icon />
                      </div>
                    )}

                    <div className="body">
                      <div className="feature-icon"><Icon /></div>
                      <h3>{s.title}</h3>
                      <p className="muted">{s.description}</p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}