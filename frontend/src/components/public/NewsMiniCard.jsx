import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { buildUploadUrl } from '../../services/api';

function formatDate(date) {
  if (!date) return '';

  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default function NewsMiniCard({ news }) {
  return (
    <>
      <style>{`
        .news-card{
          width:100%;
          max-width:100%;
          display:flex;
          align-items:flex-start;
          gap:20px;
          background:#fff;
          padding:20px;
          border-radius:15px;
          box-shadow:0 4px 15px rgba(0,0,0,.08);
          overflow:hidden;
        }

        .news-image{
          flex-shrink:0;
        }

        .news-image img{
          width:120px;
          height:120px;
          object-fit:cover;
          border-radius:12px;
          display:block;
        }

        .news-content{
          flex:1;
          min-width:0;
        }

        .news-content h3{
          margin:0 0 10px;
          font-size:1.1rem;
          color:#0c1a3a;
          font-weight:700;
        }

        .meta{
          display:flex;
          align-items:center;
          gap:8px;
          color:#777;
          font-size:.9rem;
          margin-bottom:12px;
        }

        .news-content p{
          margin-bottom:15px;
          color:#555;
          line-height:1.6;
        }

        .btn-news{
          display:inline-block;
          background:#0c1a3a;
          color:white;
          text-decoration:none;
          padding:10px 18px;
          border-radius:8px;
          font-size:.85rem;
          font-weight:600;
          transition:.3s;
        }

        .btn-news:hover{
          background:#d4af37;
          color:#0c1a3a;
        }

        @media(max-width:768px){

          .news-card{
            flex-direction:column;
          }

          .news-image{
            width:100%;
          }

          .news-image img{
            width:100%;
            height:220px;
          }

        }
      `}</style>

      <div className="news-card">

        <div className="news-image">
          <img
            src={
              news.image_url
                ? buildUploadUrl(news.image_url)
                : 'https://placehold.co/120x120/0c1a3a/ffffff?text=Noticia'
            }
            alt={news.title}
          />
        </div>

        <div className="news-content">

          <h3>{news.title}</h3>

          <div className="meta">
            <FaCalendarAlt />
            <span>{formatDate(news.published_at)}</span>
          </div>

          <p>{news.excerpt}</p>

          <Link
            to={`/noticias/${news.slug}`}
            className="btn-news"
          >
            LEER MÁS
          </Link>

        </div>

      </div>
    </>
  );
}

export { formatDate };