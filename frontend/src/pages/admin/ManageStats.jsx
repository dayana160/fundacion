import React from 'react';
import ResourceManager from '../../components/admin/ResourceManager';
import { statService } from '../../services/resources';
import { ICON_OPTIONS } from '../../components/iconMap';

const fields = [
  { name: 'value', label: 'Valor (ej. 15+, 800+)', type: 'text', required: true },
  { name: 'label', label: 'Etiqueta (ej. Años de experiencia)', type: 'text', required: true },
  { name: 'icon', label: 'Ícono', type: 'select', options: ICON_OPTIONS.map((o) => ({ value: o.value, label: o.label })) },
  { name: 'order_index', label: 'Orden', type: 'number' },
];

const columns = [
  { key: 'value', label: 'Valor' },
  { key: 'label', label: 'Etiqueta' },
];

export default function ManageStats() {
  return (
    <ResourceManager
      title="Estadísticas"
      service={statService}
      columns={columns}
      fields={fields}
      imageField={null}
      emptyMessage="Agrega tu primera estadística (ej. 15+ Años de experiencia)."
    />
  );
}
