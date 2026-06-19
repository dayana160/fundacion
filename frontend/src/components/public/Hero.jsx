import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ShieldLogo from './ShieldLogo';
import { buildUploadUrl } from '../../services/api';

export default function Hero({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) {
    return (
      <section className="hero">
        <div className="container hero-content">
          <h2>
            FORMAMOS
            <span className="highlight">DEPORTISTAS</span>
            Y MEJORES PERSONAS
          </h2>
          <p className="subtitle">
            Agrega una diapositiva desde el panel de administración para personalizar este mensaje.
          </p>
        </div>
      </section>
    );
  }

  const slide = slides[index];
  const goTo = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${buildUploadUrl(slide.image_url)})` }}
    >
      {slides.length > 1 && (
        <>
          <button className="hero-arrow left" onClick={() => goTo(index - 1)} aria-label="Anterior">
            <FaChevronLeft />
          </button>
          <button className="hero-arrow right" onClick={() => goTo(index + 1)} aria-label="Siguiente">
            <FaChevronRight />
          </button>
        </>
      )}

      <div className="container hero-content">
        <h2>
          {slide.title_line1}
          {slide.title_highlight && <span className="highlight">{slide.title_highlight}</span>}
          {slide.title_line2}
        </h2>
        {slide.subtitle && <p className="subtitle">{slide.subtitle}</p>}
        <div className="hero-actions">
          {slide.button1_text && (
            <Link to={slide.button1_link || '#'} className="btn btn-gold">
              {slide.button1_text} <FaChevronRight size={12} />
            </Link>
          )}
          {slide.button2_text && (
            <Link to={slide.button2_link || '#'} className="btn btn-outline-navy" style={{ color: '#fff', borderColor: '#fff' }}>
              {slide.button2_text}
            </Link>
          )}
        </div>
      </div>

      <div className="hero-badge">
        <ShieldLogo size={200} />
      </div>

      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={i === index ? 'active' : ''}
              onClick={() => goTo(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
