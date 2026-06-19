import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEnvelopeOpen, FaTrash, FaEye } from 'react-icons/fa';
import { Loader, EmptyState } from '../../components/Shared';
import { quoteService } from '../../services/resources';

function formatDateTime(d) {
  return new Date(d).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function ManageQuotes() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    quoteService.getAll().then(setItems).catch(() => setItems([])).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function viewItem(item) {
    if (!item.is_read) {
      await quoteService.markRead(item.id);
    }
    Swal.fire({
      title: 'Solicitud de cotización',
      html: `
        <div style="text-align:left;font-size:0.9rem">
          <p><strong>Nombre:</strong> ${item.name}</p>
          <p><strong>Correo:</strong> ${item.email}</p>
          <p><strong>Teléfono:</strong> ${item.phone || '—'}</p>
          <p><strong>Servicio de interés:</strong> ${item.service_interest || '—'}</p>
          <p><strong>Mensaje:</strong><br/>${item.message || '—'}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar',
    });
    load();
  }

  async function handleDelete(item) {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar esta solicitud?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d9483b',
    });
    if (!result.isConfirmed) return;
    await quoteService.remove(item.id);
    load();
  }

  return (
    <div className="panel">
      <div className="panel-header"><h2>Solicitudes de cotización</h2></div>
      <div className="panel-body">
        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <EmptyState admin message="Todavía no has recibido solicitudes desde 'Cotiza con nosotros'." />
        ) : (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Servicio de interés</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ fontWeight: item.is_read ? 400 : 700 }}>
                    <td>
                      <span className={`badge ${item.is_read ? 'badge-muted' : 'badge-success'}`}>
                        {item.is_read ? 'Leída' : 'Nueva'}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.service_interest || '—'}</td>
                    <td>{formatDateTime(item.created_at)}</td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn" title="Ver" onClick={() => viewItem(item)}>
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
