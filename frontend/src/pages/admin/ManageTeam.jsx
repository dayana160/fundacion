import React from 'react';
import ResourceManager from '../../components/admin/ResourceManager';
import { teamService } from '../../services/resources';

const fields = [
  { name: 'name', label: 'Nombre completo', type: 'text', required: true },
  { name: 'role', label: 'Cargo / rol', type: 'text', placeholder: 'Director Técnico' },
  { name: 'bio', label: 'Breve descripción', type: 'textarea', fullWidth: true },
  { name: 'order_index', label: 'Orden', type: 'number' },
];

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'role', label: 'Cargo' },
];

export default function ManageTeam() {
  return (
    <ResourceManager
      title="Equipo / Cuerpo técnico"
      service={teamService}
      columns={columns}
      fields={fields}
      imageField={{ name: 'photo', label: 'Foto', column: 'photo_url', required: false }}
      emptyMessage="Agrega al primer miembro de tu equipo (entrenadores, staff, etc.)."
    />
  );
}
