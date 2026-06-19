import React from 'react';
import ResourceManager from '../../components/admin/ResourceManager';
import { newsService } from '../../services/resources';

const fields = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'published_at', label: 'Fecha de publicación', type: 'date', required: true },
  { name: 'excerpt', label: 'Resumen corto (aparece en las tarjetas)', type: 'textarea', fullWidth: true },
  { name: 'content', label: 'Contenido completo', type: 'textarea', fullWidth: true, required: true },
];

const columns = [
  { key: 'title', label: 'Título' },
  { key: 'published_at', label: 'Fecha' },
  { key: 'slug', label: 'URL (slug)' },
];

export default function ManageNews() {
  return (
    <ResourceManager
      title="Noticias"
      service={newsService}
      columns={columns}
      fields={fields}
      imageField={{ name: 'image', label: 'Imagen de la noticia', column: 'image_url', required: false }}
      emptyMessage="Publica tu primera noticia."
    />
  );
}
