import React from 'react';
import ResourceManager from '../../components/admin/ResourceManager';
import { tournamentService } from '../../services/resources';

const STATUS_OPTIONS = [
  { value: 'proximo', label: 'Próximo' },
  { value: 'en_curso', label: 'En curso' },
  { value: 'finalizado', label: 'Finalizado' },
];

const fields = [
  { name: 'title', label: 'Título del torneo', type: 'text', required: true },
  { name: 'status', label: 'Estado', type: 'select', options: STATUS_OPTIONS, required: true },
  { name: 'start_date', label: 'Fecha de inicio', type: 'date' },
  { name: 'end_date', label: 'Fecha de fin', type: 'date' },
  { name: 'location', label: 'Lugar', type: 'text', placeholder: 'Guayaquil, Ecuador' },
  { name: 'registration_link', label: 'Enlace de inscripción (opcional)', type: 'text' },
  { name: 'description', label: 'Descripción', type: 'textarea', fullWidth: true },
  { name: 'order_index', label: 'Orden', type: 'number' },
];

const columns = [
  { key: 'title', label: 'Título' },
  { key: 'status', label: 'Estado' },
  { key: 'start_date', label: 'Inicio' },
  { key: 'end_date', label: 'Fin' },
  { key: 'location', label: 'Lugar' },
];

export default function ManageTournaments() {
  return (
    <ResourceManager
      title="Torneos"
      service={tournamentService}
      columns={columns}
      fields={fields}
      imageField={{ name: 'image', label: 'Imagen del torneo', column: 'image_url', required: false }}
      emptyMessage="Agrega tu primer torneo (ej. Copa Fundación 2024)."
    />
  );
}
