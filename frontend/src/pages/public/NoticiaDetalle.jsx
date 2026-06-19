import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { Loader } from '../../components/Shared';
import { newsService } from '../../services/resources';
import { buildUploadUrl } from '../../services/api';
import { formatDate } from '../../components/public/NewsMiniCard';

export default function NoticiaDetalle() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    newsService
      .getBySlug(slug)
      .then(setNews)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;

  if (notFound || !news) {
    return (
      <div className="section container text-center">
        <h2>Noticia no encontrada</h2>
        <Link to="/noticias" className="btn btn-navy">Volver a Noticias</Link>
      </div>
    );
  }

  return (
    <div className="section container">
      <div className="news-detail">
        <Link to="/noticias" className="muted" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
          <FaArrowLeft size={12} /> Volver a Noticias
        </Link>
        {news.image_url && <img src={buildUploadUrl(news.image_url)} alt={news.title} />}
        <h1>{news.title}</h1>
        <div className="meta"><FaCalendarAlt /> {formatDate(news.published_at)}</div>
        <div className="content">{news.content}</div>
      </div>
    </div>
  );
}
