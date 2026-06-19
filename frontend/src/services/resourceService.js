import api from './api';

/**
 * Crea un conjunto de funciones estándar para interactuar con un recurso CRUD
 * del backend (hero, servicios, torneos, noticias, galería, estadísticas, equipo).
 *
 * @param {string} basePath - ej. '/hero', '/services'
 */
export function createResourceService(basePath) {
  return {
    // Lista pública (solo activos) - usada en las páginas del sitio
    getPublic: () => api.get(basePath).then((res) => res.data),
    // Lista completa - usada en el panel admin
    getAllAdmin: () => api.get(`${basePath}/admin`).then((res) => res.data),
    getOne: (id) => api.get(`${basePath}/${id}`).then((res) => res.data),
    create: (formData) =>
      api
        .post(basePath, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => res.data),
    update: (id, formData) =>
      api
        .put(`${basePath}/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => res.data),
    remove: (id) => api.delete(`${basePath}/${id}`).then((res) => res.data),
    toggleActive: (id) => api.patch(`${basePath}/${id}/active`).then((res) => res.data),
  };
}
