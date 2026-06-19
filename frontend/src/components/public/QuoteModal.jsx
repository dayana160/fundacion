import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { quoteService } from '../../services/resources';

const initialForm = { name: '', email: '', phone: '', service_interest: '', message: '' };

export default function QuoteModal({ onClose }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      const res = await quoteService.send(form);
      setStatus({ loading: false, success: res.message, error: '' });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        loading: false,
        success: '',
        error: err.response?.data?.message || 'Ocurrió un error al enviar tu solicitud.',
      });
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar"><FaTimes /></button>
        <h3>Cotiza con nosotros</h3>
        <p className="muted" style={{ marginTop: -8, marginBottom: 18, fontSize: '0.85rem' }}>
          Cuéntanos qué necesitas y nuestro equipo te contactará a la brevedad.
        </p>

        {status.success && <div className="alert alert-success">{status.success}</div>}
        {status.error && <div className="alert alert-error">{status.error}</div>}

        {!status.success && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="quote-name">Nombre completo *</label>
              <input id="quote-name" className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="quote-email">Correo electrónico *</label>
                <input id="quote-email" type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="quote-phone">Teléfono</label>
                <input id="quote-phone" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="quote-service">Servicio de interés</label>
              <input
                id="quote-service"
                className="form-control"
                name="service_interest"
                placeholder="Ej. Formación deportiva, Torneos..."
                value={form.service_interest}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quote-message">Mensaje</label>
              <textarea id="quote-message" className="form-control" name="message" value={form.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-gold btn-block" disabled={status.loading}>
              {status.loading ? 'Enviando...' : 'ENVIAR SOLICITUD'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
