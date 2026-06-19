import api from './api';
import { createResourceService } from './resourceService';

export const heroService = createResourceService('/hero');
export const serviceService = createResourceService('/services');
export const tournamentService = createResourceService('/tournaments');
export const newsService = {
  ...createResourceService('/news'),
  getBySlug: (slug) => api.get(`/news/slug/${slug}`).then((res) => res.data),
};
export const galleryService = createResourceService('/gallery');
export const statService = createResourceService('/stats');
export const teamService = createResourceService('/team');

export const siteConfigService = {
  get: () => api.get('/site-config').then((res) => res.data),
  update: (formData) =>
    api
      .put('/site-config', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => res.data),
};

export const contactService = {
  send: (data) => api.post('/contact-messages', data).then((res) => res.data),
  getAll: () => api.get('/contact-messages').then((res) => res.data),
  markRead: (id) => api.patch(`/contact-messages/${id}/read`).then((res) => res.data),
  remove: (id) => api.delete(`/contact-messages/${id}`).then((res) => res.data),
};

export const quoteService = {
  send: (data) => api.post('/quote-requests', data).then((res) => res.data),
  getAll: () => api.get('/quote-requests').then((res) => res.data),
  markRead: (id) => api.patch(`/quote-requests/${id}/read`).then((res) => res.data),
  remove: (id) => api.delete(`/quote-requests/${id}`).then((res) => res.data),
};

export const dashboardService = {
  getSummary: () => api.get('/dashboard/summary').then((res) => res.data),
};

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }).then((res) => res.data),
  logout: () => api.post('/auth/logout').then((res) => res.data),
  me: () => api.get('/auth/me').then((res) => res.data),
  changePassword: (currentPassword, newPassword) =>
    api.put('/auth/password', { currentPassword, newPassword }).then((res) => res.data),
  updateProfile: (name, email) => api.put('/auth/profile', { name, email }).then((res) => res.data),
};
