import React from 'react';
import ResourceManager from '../../components/admin/ResourceManager';
import { heroService } from '../../services/resources';

const fields = [
  { name: 'title_line1', label: 'Línea 1 del título', type: 'text', placeholder: 'FORMAMOS' },
  { name: 'title_highlight', label: 'Texto destacado (color dorado)', type: 'text', placeholder: 'DEPORTISTAS' },
  { name: 'title_line2', label: 'Línea 2 del título', type: 'text', placeholder: 'Y MEJORES PERSONAS' },
  { name: 'subtitle', label: 'Subtítulo', type: 'textarea', fullWidth: true },
  { name: 'button1_text', label: 'Texto botón 1', type: 'text', placeholder: 'CONÓCENOS' },
  { name: 'button1_link', label: 'Enlace botón 1', type: 'text', placeholder: '/nosotros' },
  { name: 'button2_text', label: 'Texto botón 2', type: 'text', placeholder: 'NUESTROS SERVICIOS' },
  { name: 'button2_link', label: 'Enlace botón 2', type: 'text', placeholder: '/servicios' },
  { name: 'order_index', label: 'Orden', type: 'number' },
];

const columns = [
  { key: 'title_line1', label: 'Título' },
  { key: 'title_highlight', label: 'Destacado' },
  { key: 'order_index', label: 'Orden' },
];

export default function ManageHero() {
  return (
    <ResourceManager
      title="Carrusel principal (Hero)"
      service={heroService}
      columns={columns}
      fields={fields}
      imageField={{ name: 'image', label: 'Imagen de fondo', column: 'image_url', required: true }}
      emptyMessage="Agrega tu primera diapositiva para el carrusel de inicio."
    />
  );
}
