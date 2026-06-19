import React, { useEffect, useMemo, useState } from 'react';
import { Loader, EmptyState } from '../../components/Shared';
import { galleryService } from '../../services/resources';
import { buildUploadUrl } from '../../services/api';

export default function Galeria() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todas');

  useEffect(() => {
    galleryService.getPublic().then(setImages).finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(images.map((i) => i.category || 'General'));
    return ['Todas', ...Array.from(set)];
  }, [images]);

  const filtered = filter === 'Todas' ? images : images.filter((i) => (i.category || 'General') === filter);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Galería</h1>
          <p>Momentos destacados de nuestros deportistas dentro y fuera de la cancha.</p>
        </div>
      </div>

      <div className="section container">
        {loading ? (
          <Loader />
        ) : images.length === 0 ? (
          <EmptyState message="Sube fotos a la galería desde el panel de administración." />
        ) : (
          <>
            <div className="gallery-filters">
              {categories.map((c) => (
                <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div className="gallery-full-grid">
              {filtered.map((img) => (
                <figure key={img.id}>
                  <img src={buildUploadUrl(img.image_url)} alt={img.caption || 'Galería'} />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
