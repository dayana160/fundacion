import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram,
  FaYoutube, FaTwitter, FaBars, FaTimes,
} from 'react-icons/fa';
import ShieldLogo from './ShieldLogo';
import { buildUploadUrl } from '../../services/api';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/torneos', label: 'Torneos' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/galeria', label: 'Galería' },
  { to: '/estadisticas', label: 'Estadísticas' },
 
];

export default function Navbar({ config, onOpenQuote }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{NAV_STYLES}</style>

      <div className="topbar">
        <div className="container">
          <div className="topbar-info">
            {config?.address && <span><FaMapMarkerAlt /> {config.address}</span>}
            {config?.phone && <span><FaPhoneAlt /> {config.phone}</span>}
            {config?.email && <span><FaEnvelope /> {config.email}</span>}
          </div>
          <div className="topbar-social">
            {config?.facebook_url && <a href={config.facebook_url} target="_blank" rel="noreferrer"><FaFacebookF /></a>}
            {config?.instagram_url && <a href={config.instagram_url} target="_blank" rel="noreferrer"><FaInstagram /></a>}
            {config?.youtube_url && <a href={config.youtube_url} target="_blank" rel="noreferrer"><FaYoutube /></a>}
            {config?.twitter_url && <a href={config.twitter_url} target="_blank" rel="noreferrer"><FaTwitter /></a>}
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {/* Escudo: si hay logo en BD lo usa, si no el SVG genérico */}
            <div className="nb-shield">
              {config?.logo_url ? (
                <img
                  src={buildUploadUrl(config.logo_url)}
                  alt={config?.site_name}
                  className="nb-shield-img"
                />
              ) : (
                <img src="/escudo.png" alt="Escudo Fundación Deportiva Referees" style={{width:'58px', height:'58px', objectFit:'contain', borderRadius:'50%'}} />
              )}
            </div>

            {/* Nombre en una sola línea usando el texto corto */}
            <div className="nb-brand-text">
              <span className="nb-name">FUND. DEP. REFEREES</span>
              <span className="nb-tagline">Juego Limpio </span>
            </div>
          </Link>

          <button className="navbar-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menú">
            {open ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`navbar-links ${open ? 'open' : ''}`}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                end={link.to === '/'}
              >
                {link.label.toUpperCase()}
              </NavLink>
            ))}
          </div>

          <div className="navbar-actions">
            <button className="btn btn-gold btn-sm" onClick={onOpenQuote}>
              <span className="btn-text-label">COTIZA CON NOSOTROS</span>
            </button>
            <Link to="/admin/login" className="btn btn-navy btn-sm">
              <span className="btn-text-label">INICIAR SESIÓN</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

const NAV_STYLES = `
  /* Escudo en navbar */
  .nb-shield {
    width: 58px;
    height: 58px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nb-shield-img {
    width: 58px;
    height: 58px;
    object-fit: contain;
    border-radius: 50%;
  }

  /* Texto de marca */
  .nb-brand-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    line-height: 1.2;
  }
  .nb-name {
    font-size: 1rem;
    font-weight: 800;
    color: var(--navy-900);
    letter-spacing: .03em;
    white-space: nowrap;
  }
  .nb-tagline {
    font-size: .68rem;
    color: var(--gray-600);
    white-space: nowrap;
  }

  /* Ocultar estilos viejos que puedan chocar */
  .navbar-brand-text { display: none !important; }
  .navbar-logo-shield { display: none !important; }
`;