import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaTwitter,
} from 'react-icons/fa';
import { contactService } from '../../services/resources';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contacto() {
  const { config } = useOutletContext();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      const res = await contactService.send(form);
      setStatus({ loading: false, success: res.message, error: '' });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        loading: false,
        success: '',
        error: err.response?.data?.message || 'Ocurrió un error al enviar tu mensaje.',
      });
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Contacto</h1>
          <p>Estamos aquí para responder tus preguntas.</p>
        </div>
      </div>

      <div className="section container">
        <div className="contact-grid">
          <div className="contact-info-card">
            <h3>Información de contacto</h3>
            {config?.address && (
              <div className="contact-info-item">
                <span className="ic"><FaMapMarkerAlt /></span>
                <span>{config.address}</span>
              </div>
            )}
            {config?.phone && (
              <div className="contact-info-item">
                <span className="ic"><FaPhoneAlt /></span>
                <span>{config.phone}</span>
              </div>
            )}
            {config?.email && (
              <div className="contact-info-item">
                <span className="ic"><FaEnvelope /></span>
                <span>{config.email}</span>
              </div>
            )}
            <div className="contact-social">
              {config?.facebook_url && <a href={config.facebook_url} target="_blank" rel="noreferrer"><FaFacebookF /></a>}
              {config?.instagram_url && <a href={config.instagram_url} target="_blank" rel="noreferrer"><FaInstagram /></a>}
              {config?.youtube_url && <a href={config.youtube_url} target="_blank" rel="noreferrer"><FaYoutube /></a>}
              {config?.twitter_url && <a href={config.twitter_url} target="_blank" rel="noreferrer"><FaTwitter /></a>}
            </div>
          </div>

          <div>
            {status.success && <div className="alert alert-success">{status.success}</div>}
            {status.error && <div className="alert alert-error">{status.error}</div>}
            {!status.success && (
              <form onSubmit={handleSubmit}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-name">Nombre completo *</label>
                    <input id="contact-name" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Correo electrónico *</label>
                    <input id="contact-email" type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-phone">Teléfono</label>
                    <input id="contact-phone" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">Asunto</label>
                    <input id="contact-subject" className="form-control" name="subject" value={form.subject} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Mensaje *</label>
                  <textarea id="contact-message" className="form-control" name="message" value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-gold" disabled={status.loading}>
                  {status.loading ? 'Enviando...' : 'ENVIAR MENSAJE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
