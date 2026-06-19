import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { Loader, EmptyState } from '../../components/Shared';
import { newsService } from '../../services/resources';
import { buildUploadUrl } from '../../services/api';
import { formatDate } from '../../components/public/NewsMiniCard';

export default function Noticias() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getPublic().then(setNews).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Noticias</h1>
          <p>Mantente al día con lo que sucede en nuestra fundación.</p>
        </div>
      </div>

      <div className="section container">
        {loading ? (
          <Loader />
        ) : news.length === 0 ? (
          <EmptyState message="Aún no hay noticias publicadas." />
        ) : (
          <div className="news-grid">
            {news.map((n) => (
              <div className="news-page-card" key={n.id}>
                <img
                  src={n.image_url ? buildUploadUrl(n.image_url) : 'https://placehold.co/400x170/0c1a3a/ffffff?text=Noticia'}
                  alt={n.title}
                />
                <div className="body">
                  <div className="meta" style={{ marginBottom: 8 }}><FaCalendarAlt /> {formatDate(n.published_at)}</div>
                  <h3 style={{ color: '#0c1a3a', marginTop: 0 }}>{n.title}</h3>
                  <p className="muted">{n.excerpt}</p>
                  <Link to={`/noticias/${n.slug}`} className="btn btn-navy btn-sm">LEER MÁS</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
