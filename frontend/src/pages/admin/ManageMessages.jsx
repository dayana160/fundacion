import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEnvelopeOpen, FaTrash, FaEye } from 'react-icons/fa';
import { Loader, EmptyState } from '../../components/Shared';
import { contactService } from '../../services/resources';

function formatDateTime(d) {
  return new Date(d).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function ManageMessages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    contactService.getAll().then(setItems).catch(() => setItems([])).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function viewMessage(item) {
    if (!item.is_read) {
      await contactService.markRead(item.id);
    }
    Swal.fire({
      title: item.subject || 'Mensaje de contacto',
      html: `
        <div style="text-align:left;font-size:0.9rem">
          <p><strong>Nombre:</strong> ${item.name}</p>
          <p><strong>Correo:</strong> ${item.email}</p>
          <p><strong>Teléfono:</strong> ${item.phone || '—'}</p>
          <p><strong>Mensaje:</strong><br/>${item.message}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar',
    });
    load();
  }

  async function handleDelete(item) {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar este mensaje?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d9483b',
    });
    if (!result.isConfirmed) return;
    await contactService.remove(item.id);
    load();
  }

  return (
    <div className="panel">
      <div className="panel-header"><h2>Mensajes de contacto</h2></div>
      <div className="panel-body">
        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <EmptyState admin message="Todavía no has recibido mensajes desde el formulario de contacto." />
        ) : (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Asunto</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ fontWeight: item.is_read ? 400 : 700 }}>
                    <td>
                      <span className={`badge ${item.is_read ? 'badge-muted' : 'badge-success'}`}>
                        {item.is_read ? 'Leído' : 'Nuevo'}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject || '—'}</td>
                    <td>{formatDateTime(item.created_at)}</td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn" title="Ver" onClick={() => viewMessage(item)}>
                          {item.is_read ? <FaEye /> : <FaEnvelopeOpen />}
                        </button>
                        <button className="icon-btn danger" title="Eliminar" onClick={() => handleDelete(item)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
