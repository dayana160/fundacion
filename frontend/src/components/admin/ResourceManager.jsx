import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaTimes, FaImage } from 'react-icons/fa';
import { EmptyState, Loader } from '../Shared';
import { buildUploadUrl } from '../../services/api';

/**
 * Panel de gestión genérico (listar / crear / editar / eliminar / activar-desactivar)
 * para cualquier recurso administrable del sitio.
 *
 * @param {string} title - título del panel
 * @param {object} service - { getAllAdmin, create, update, remove, toggleActive }
 * @param {Array}  columns - [{ key, label, render?(row) }] columnas a mostrar en la tabla
 * @param {Array}  fields - [{ name, label, type, required, options, fullWidth, placeholder }]
 *                  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox'
 * @param {object} imageField - { name: 'image', label: 'Imagen', column: 'image_url', required }
 * @param {boolean} hasActiveToggle - si el recurso soporta activar/desactivar (true por defecto)
 * @param {string} emptyMessage
 */
export default function ResourceManager({
  title,
  service,
  columns,
  fields,
  imageField = null,
  hasActiveToggle = true,
  emptyMessage = 'Todavía no hay registros. Crea el primero con el botón "Agregar".',
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  function load() {
    setLoading(true);
    service
      .getAllAdmin()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = f.type === 'checkbox' ? false : '';
    });
    setFormData(initial);
    setFile(null);
    setPreview(null);
    setEditing(null);
    setFormError('');
    setShowForm(true);
  }

  function openEdit(item) {
    const initial = {};
    fields.forEach((f) => {
      if (f.type === 'checkbox') {
        initial[f.name] = !!item[f.name];
      } else {
        initial[f.name] = item[f.name] ?? '';
      }
    });
    setFormData(initial);
    setFile(null);
    setPreview(imageField && item[imageField.column] ? buildUploadUrl(item[imageField.column]) : null);
    setEditing(item);
    setFormError('');
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  function handleFieldChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (imageField?.required && !editing && !file) {
      setFormError(`${imageField.label} es obligatoria.`);
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fields.forEach((f) => {
        let value = formData[f.name];
        if (f.type === 'checkbox') value = value ? 1 : 0;
        fd.append(f.name, value ?? '');
      });
      if (file && imageField) {
        fd.append(imageField.name, file);
      }

      if (editing) {
        await service.update(editing.id, fd);
        Swal.fire({ icon: 'success', title: 'Actualizado correctamente', timer: 1500, showConfirmButton: false });
      } else {
        await service.create(fd);
        Swal.fire({ icon: 'success', title: 'Creado correctamente', timer: 1500, showConfirmButton: false });
      }
      closeForm();
      load();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Ocurrió un error al guardar.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar este registro?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d9483b',
    });
    if (!result.isConfirmed) return;
    try {
      await service.remove(item.id);
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false });
      load();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'No se pudo eliminar.' });
    }
  }

  async function handleToggle(item) {
    try {
      await service.toggleActive(item.id);
      load();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cambiar el estado.' });
    }
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{title}</h2>
        <button className="btn btn-navy btn-sm" onClick={openCreate}><FaPlus /> Agregar</button>
      </div>
      <div className="panel-body">
        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <EmptyState admin message={emptyMessage} />
        ) : (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {imageField && <th>{imageField.label}</th>}
                  {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                  {hasActiveToggle && <th>Estado</th>}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    {imageField && (
                      <td>
                        {item[imageField.column] ? (
                          <img className="thumb" src={buildUploadUrl(item[imageField.column])} alt="" />
                        ) : (
                          <div className="thumb" style={{ background: '#e3e6ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaImage color="#9aa1b5" />
                          </div>
                        )}
                      </td>
                    )}
                    {columns.map((c) => (
                      <td key={c.key}>{c.render ? c.render(item) : (item[c.key] ?? '—')}</td>
                    ))}
                    {hasActiveToggle && (
                      <td>
                        <button className="icon-btn" onClick={() => handleToggle(item)} title="Activar/Desactivar">
                          {item.active ? <FaToggleOn color="#1f7a36" size={18} /> : <FaToggleOff color="#9aa1b5" size={18} />}
                        </button>
                      </td>
                    )}
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn" onClick={() => openEdit(item)} title="Editar"><FaEdit /></button>
                        <button className="icon-btn danger" onClick={() => handleDelete(item)} title="Eliminar"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal-box" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeForm}><FaTimes /></button>
            <h3>{editing ? 'Editar registro' : 'Agregar registro'}</h3>

            {formError && <div className="alert alert-error">{formError}</div>}

            <form onSubmit={handleSubmit}>
              {imageField && (
                <div className="image-upload-box" style={{ marginBottom: 18 }}>
                  {preview ? (
                    <img src={preview} alt="preview" />
                  ) : (
                    <div className="image-upload-placeholder"><FaImage size={28} /><p>Sin imagen seleccionada</p></div>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  <p className="muted" style={{ fontSize: '0.72rem', marginTop: 6 }}>{imageField.label} (JPG, PNG, WEBP — máx. 5MB)</p>
                </div>
              )}

              <div className="admin-form-grid">
                {fields.map((f) => (
                  <div key={f.name} className={`form-group ${f.fullWidth ? 'full' : ''}`}>
                    {f.type !== 'checkbox' && <label htmlFor={`field-${f.name}`}>{f.label}{f.required ? ' *' : ''}</label>}

                    {f.type === 'textarea' && (
                      <textarea
                        id={`field-${f.name}`}
                        className="form-control"
                        value={formData[f.name] ?? ''}
                        required={f.required}
                        placeholder={f.placeholder}
                        onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      />
                    )}

                    {f.type === 'select' && (
                      <select
                        id={`field-${f.name}`}
                        className="form-control"
                        value={formData[f.name] ?? ''}
                        required={f.required}
                        onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      >
                        <option value="">Seleccionar...</option>
                        {f.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}

                    {f.type === 'checkbox' && (
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={!!formData[f.name]}
                          onChange={(e) => handleFieldChange(f.name, e.target.checked)}
                        />
                        {f.label}
                      </label>
                    )}

                    {(f.type === 'text' || f.type === 'number' || f.type === 'date' || !f.type) && (
                      <input
                        id={`field-${f.name}`}
                        type={f.type || 'text'}
                        className="form-control"
                        value={formData[f.name] ?? ''}
                        required={f.required}
                        placeholder={f.placeholder}
                        onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline-navy" onClick={closeForm}>Cancelar</button>
                <button type="submit" className="btn btn-navy" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
