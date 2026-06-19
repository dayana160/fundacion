 import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/public/Hero';
import FeatureCard from '../../components/public/FeatureCard';
import TournamentMiniCard from '../../components/public/TournamentMiniCard';
import NewsMiniCard from '../../components/public/NewsMiniCard';
import { Loader, EmptyState } from '../../components/Shared';
import {
  heroService,
  serviceService,
  tournamentService,
  newsService,
  galleryService,
} from '../../services/resources';
import { buildUploadUrl } from '../../services/api';

/* ── Fade-in on scroll ── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('h-visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '' }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`h-reveal ${className}`}>{children}</div>;
}

/* ── Componente principal ── */
export default function Home() {
  const [data, setData] = useState({ hero: [], services: [], tournaments: [], news: [], gallery: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      heroService.getPublic(),
      serviceService.getPublic(),
      tournamentService.getPublic(),
      newsService.getPublic(),
      galleryService.getPublic(),
    ])
      .then(([hero, services, tournaments, news, gallery]) => {
        setData({ hero, services: services.filter((s) => s.show_on_home), tournaments, news, gallery });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <style>{STYLES}</style>

      {/* ── HERO ── */}
      <Hero slides={data.hero} />

      {/* ── SERVICIOS ── */}
      <Reveal>
        <section className="h-section h-section--gray">
          <div className="h-container">
            <div className="h-section-head">
              <span className="h-eyebrow">Lo que hacemos</span>
              <h2 className="h-title">Formación integral, <em>resultados reales</em></h2>
            </div>
            <div className="h-services-grid">
              {data.services.length === 0 ? (
                <EmptyState message="Agrega servicios desde el panel de administración." />
              ) : (
                data.services.map((s, i) => (
                  <FeatureCard
                    key={s.id}
                    icon={s.icon}
                    title={s.title}
                    description={s.description}
                    color={i % 2 === 0 ? 'navy' : 'gold'}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── TORNEOS + NOTICIAS ── */}
      <Reveal>
        <section className="h-section">
          <div className="h-container h-two-col">
            {/* Torneos */}
            <div className="h-col">
              <span className="h-eyebrow">Competencia</span>
              <h3 className="h-col-title">Próximos Torneos</h3>
              {data.tournaments.length === 0
                ? <EmptyState message="No hay torneos programados." />
                : data.tournaments.slice(0, 2).map((t) => <TournamentMiniCard key={t.id} tournament={t} />)
              }
              <Link to="/torneos" className="h-link-more">Ver todos los torneos →</Link>
            </div>

            <div className="h-col-divider" />

            {/* Noticias */}
            <div className="h-col">
              <span className="h-eyebrow">Actualidad</span>
              <h3 className="h-col-title">Noticias Recientes</h3>
              {data.news.length === 0
                ? <EmptyState message="No hay noticias publicadas." />
                : data.news.slice(0, 2).map((n) => <NewsMiniCard key={n.id} news={n} />)
              }
              <Link to="/noticias" className="h-link-more">Ver todas las noticias →</Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── GALERÍA ── */}
      {data.gallery.length > 0 && (
        <Reveal>
          <section className="h-section h-section--dark">
            <div className="h-container">
              <div className="h-gallery-head">
                <div>
                  <span className="h-eyebrow">Momentos</span>
                  <h2 className="h-title h-title--light">Nuestra <em>Galería</em></h2>
                </div>
                <Link to="/galeria" className="h-btn-outline">Ver galería completa</Link>
              </div>
              <div className="h-gallery-grid">
                {data.gallery.slice(0, 6).map((g) => (
                  <div key={g.id} className="h-gthumb">
                    <img src={buildUploadUrl(g.image_url)} alt={g.caption || 'Galería'} loading="lazy" />
                    <div className="h-gthumb-overlay" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}
    </>
  );
}

/* ── Estilos scoped ── */
const STYLES = `
  /* Reveal animation */
  .h-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .5s ease, transform .5s ease;
  }
  .h-reveal.h-visible {
    opacity: 1;
    transform: none;
  }

  /* Contenedor bien centrado igual al resto del sitio */
  .h-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
    width: 100%;
  }

  /* ── Secciones ── */
  .h-section { padding: 48px 0; }
  .h-section--gray { background: var(--gray-50, #f7f8fc); }
  .h-section--dark { background: var(--navy-900, #0d1b3e); }

  /* ── Encabezados ── */
  .h-section-head { margin-bottom: 1.5rem; }
  .h-eyebrow {
    display: inline-block;
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--gold-500, #c9a84c);
    margin-bottom: .3rem;
  }
  .h-title {
    font-size: clamp(1.2rem, 2.4vw, 1.75rem);
    font-weight: 800;
    line-height: 1.2;
    color: var(--navy-900, #0d1b3e);
    margin: 0;
  }
  .h-title em { font-style: normal; color: var(--gold-500, #c9a84c); }
  .h-title--light { color: #fff; }

  /* ── Servicios ── */
  .h-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  /* ── Dos columnas torneos/noticias ── */
  .h-two-col {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 2rem;
    align-items: start;
  }
  @media (max-width: 700px) {
    .h-two-col { grid-template-columns: 1fr; }
    .h-col-divider { display: none; }
  }
  .h-col-divider {
    background: var(--gray-200, #e2e6f0);
    width: 1px;
    align-self: stretch;
  }
  .h-col { display: flex; flex-direction: column; gap: .85rem; }
  .h-col-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--navy-900, #0d1b3e);
    margin: 0 0 .2rem;
  }
  .h-link-more {
    font-size: .78rem;
    font-weight: 600;
    color: var(--gold-500, #c9a84c);
    transition: opacity .2s;
    margin-top: .2rem;
  }
  .h-link-more:hover { opacity: .7; }
.h-gallery-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px;
}

.h-gthumb{
    border-radius:15px;
    overflow:hidden;
    background:white;
    height:220px;
    display:flex;
    justify-content:center;
    align-items:center;
}

.h-gthumb img{
    width:100%;
    height:100%;
    object-fit:contain; /* muestra la imagen completa */
    transition:.4s;
}

.h-gthumb:hover img{
    transform:scale(1.05);
}

@media(max-width:900px){
    .h-gallery-grid{
        grid-template-columns:repeat(2,1fr);
    }
}

@media(max-width:600px){
    .h-gallery-grid{
        grid-template-columns:1fr;
    }
}
`; 