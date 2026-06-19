import React from 'react';
import ResourceManager from '../../components/admin/ResourceManager';
import { serviceService } from '../../services/resources';
import { ICON_OPTIONS } from '../../components/iconMap';

const fields = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'icon', label: 'Ícono', type: 'select', options: ICON_OPTIONS.map((o) => ({ value: o.value, label: o.label })), required: true },
  { name: 'description', label: 'Descripción', type: 'textarea', fullWidth: true },
  { name: 'show_on_home', label: 'Mostrar en la página de Inicio', type: 'checkbox' },
  { name: 'order_index', label: 'Orden', type: 'number' },
];

const columns = [
  { key: 'title', label: 'Título' },
  { key: 'icon', label: 'Ícono' },
  { key: 'show_on_home', label: 'En Inicio', render: (item) => (item.show_on_home ? 'Sí' : 'No') },
];

export default function ManageServices() {
  return (
    <ResourceManager
      title="Servicios"
      service={serviceService}
      columns={columns}
      fields={fields}
      imageField={{ name: 'image', label: 'Imagen (opcional, para la página de Servicios)', column: 'image_url', required: false }}
      emptyMessage="Agrega tu primer servicio (ej. Formación Deportiva, Valores, Competiciones)."
    />
  );
}
