import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // envía/recibe la cookie httpOnly del token
});

// Si existe un token guardado (respaldo además de la cookie), lo adjuntamos.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/** Construye la URL absoluta de un archivo subido (imágenes, logo, etc.) */
export function buildUploadUrl(relativePath) {
  if (!relativePath) return null;
  if (relativePath.startsWith('http')) return relativePath;
  const base = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:4000';
  return `${base}${relativePath}`;
}