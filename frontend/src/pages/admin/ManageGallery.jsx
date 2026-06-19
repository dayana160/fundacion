import React from 'react';
import ResourceManager from '../../components/admin/ResourceManager';
import { galleryService } from '../../services/resources';

const fields = [
  { name: 'caption', label: 'Descripción / pie de foto', type: 'text' },
  { name: 'category', label: 'Categoría', type: 'text', placeholder: 'Entrenamientos, Torneos, Eventos...' },
  { name: 'order_index', label: 'Orden', type: 'number' },
];

const columns = [
  { key: 'caption', label: 'Descripción' },
  { key: 'category', label: 'Categoría' },
];

export default function ManageGallery() {
  return (
    <ResourceManager
      title="Galería de fotos"
      service={galleryService}
      columns={columns}
      fields={fields}
      imageField={{ name: 'image', label: 'Fotografía', column: 'image_url', required: true }}
      emptyMessage="Sube tu primera fotografía a la galería."
    />
  );
}
