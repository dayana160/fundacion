import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaImage } from 'react-icons/fa';
import { Loader } from '../../components/Shared';
import { siteConfigService } from '../../services/resources';
import { buildUploadUrl } from '../../services/api';

const TEXT_FIELDS = [
  { name: 'site_name', label: 'Nombre del sitio' },
  { name: 'site_tagline', label: 'Eslogan' },
  { name: 'address', label: 'Dirección' },
  { name: 'phone', label: 'Teléfono' },
  { name: 'email', label: 'Correo electrónico' },
  { name: 'facebook_url', label: 'Facebook (URL)' },
  { name: 'instagram_url', label: 'Instagram (URL)' },
  { name: 'youtube_url', label: 'YouTube (URL)' },
  { name: 'twitter_url', label: 'Twitter / X (URL)' },
  { name: 'footer_quote', label: 'Frase del footer (parte normal)' },
  { name: 'footer_quote_highlight', label: 'Frase del footer (parte destacada en dorado)' },
];

const TEXTAREA_FIELDS = [
  { name: 'about_mission', label: 'Misión (página Nosotros)' },
  { name: 'about_vision', label: 'Visión (página Nosotros)' },
  { name: 'about_history', label: 'Historia (página Nosotros)' },
];

export default function ManageSiteConfig() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    siteConfigService.get().then((data) => {
      setForm(data);
      setLogoPreview(data.logo_url ? buildUploadUrl(data.logo_url) : null);
      setLoading(false);
    });
  }, []);

  function handleChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogoChange(e) {
    const f = e.target.files[0];
    if (f) {
      setLogoFile(f);
      setLogoPreview(URL.createObjectURL(f));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      [...TEXT_FIELDS, ...TEXTAREA_FIELDS].forEach((f) => fd.append(f.name, form[f.name] ?? ''));
      if (logoFile) fd.append('logo', logoFile);

      const updated = await siteConfigService.update(fd);
      setForm(updated);
      Swal.fire({ icon: 'success', title: 'Configuración guardada', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'No se pudo guardar.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="panel">
      <div className="panel-header"><h2>Configuración del sitio</h2></div>
      <div className="panel-body">
        <form onSubmit={handleSubmit}>
          <div className="image-upload-box" style={{ maxWidth: 280, marginBottom: 24 }}>
            {logoPreview ? (
              <img src={logoPreview} alt="logo" />
            ) : (
              <div className="image-upload-placeholder"><FaImage size={28} /><p>Sin logo personalizado</p></div>
            )}
            <input type="file" accept="image/*" onChange={handleLogoChange} />
            <p className="muted" style={{ fontSize: '0.72rem', marginTop: 6 }}>
              Logo del sitio (opcional, se usará en el navbar y footer)
            </p>
          </div>

          <div className="admin-form-grid">
            {TEXT_FIELDS.map((f) => (
              <div className="form-group" key={f.name}>
                <label htmlFor={`config-${f.name}`}>{f.label}</label>
                <input
                  id={`config-${f.name}`}
                  className="form-control"
                  value={form[f.name] ?? ''}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                />
              </div>
            ))}
            {TEXTAREA_FIELDS.map((f) => (
              <div className="form-group full" key={f.name}>
                <label htmlFor={`config-${f.name}`}>{f.label}</label>
                <textarea
                  id={`config-${f.name}`}
                  className="form-control"
                  value={form[f.name] ?? ''}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-navy" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
