import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram,
  FaYoutube, FaTwitter, FaChevronRight,
} from 'react-icons/fa';
import ShieldLogo from './ShieldLogo';

export default function Footer({ config, stats, onOpenQuote }) {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer-cta">
        <div className="container">
          <blockquote>
            {config?.footer_quote}{' '}
            <span className="highlight">{config?.footer_quote_highlight}</span>
          </blockquote>
          <button className="btn btn-gold" onClick={onOpenQuote}>
            ÚNETE A NUESTRA FAMILIA <FaChevronRight size={12} />
          </button>
          {stats?.length > 0 && (
            <div className="footer-cta-stats">
              {stats.slice(0, 3).map((s) => (
                <div className="stat-item" key={s.id}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-block">
              
                <h3>{config?.site_name || 'FUNDACION DEPORTIVA REFEREES'}</h3>
              </div>
              <p>{config?.site_tagline}</p>
            </div>
            <div>
              <h4>Enlaces</h4>
              <ul>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/servicios">Servicios</Link></li>
                <li><Link to="/torneos">Torneos</Link></li>
                <li><Link to="/noticias">Noticias</Link></li>
                <li><Link to="/galeria">Galería</Link></li>
              </ul>
            </div>
            <div>
              <h4>Más</h4>
              <ul>
                <li><Link to="/estadisticas">Estadísticas</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <li><Link to="/admin/login">Iniciar sesión</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul>
                {config?.address && <li><FaMapMarkerAlt /> {config.address}</li>}
                {config?.phone && <li><FaPhoneAlt /> {config.phone}</li>}
                {config?.email && <li><FaEnvelope /> {config.email}</li>}
              </ul>
              <div className="contact-social" style={{ marginTop: 14 }}>
                {config?.facebook_url && <a href={config.facebook_url} target="_blank" rel="noreferrer"><FaFacebookF /></a>}
                {config?.instagram_url && <a href={config.instagram_url} target="_blank" rel="noreferrer"><FaInstagram /></a>}
                {config?.youtube_url && <a href={config.youtube_url} target="_blank" rel="noreferrer"><FaYoutube /></a>}
                {config?.twitter_url && <a href={config.twitter_url} target="_blank" rel="noreferrer"><FaTwitter /></a>}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            © {year} {config?.site_name || 'FUNDACION'}. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
