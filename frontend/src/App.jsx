import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from './components/public/PublicLayout';
import Home from './pages/public/Home';
import Nosotros from './pages/public/Nosotros';
import Servicios from './pages/public/Servicios';
import Torneos from './pages/public/Torneos';
import Noticias from './pages/public/Noticias';
import NoticiaDetalle from './pages/public/NoticiaDetalle';
import Galeria from './pages/public/Galeria';
import Estadisticas from './pages/public/Estadisticas';
import Contacto from './pages/public/Contacto';
import NotFound from './pages/public/NotFound';

import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import ManageSiteConfig from './pages/admin/ManageSiteConfig';
import ManageHero from './pages/admin/ManageHero';
import ManageServices from './pages/admin/ManageServices';
import ManageTournaments from './pages/admin/ManageTournaments';
import ManageNews from './pages/admin/ManageNews';
import ManageGallery from './pages/admin/ManageGallery';
import ManageStats from './pages/admin/ManageStats';
import ManageTeam from './pages/admin/ManageTeam';
import ManageMessages from './pages/admin/ManageMessages';
import ManageQuotes from './pages/admin/ManageQuotes';
import MyAccount from './pages/admin/MyAccount';

export default function App() {
  return (
    <Routes>
      {/* ---------- Sitio público ---------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/torneos" element={<Torneos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ---------- Panel de administración ---------- */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="site-config" element={<ManageSiteConfig />} />
        <Route path="hero" element={<ManageHero />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="tournaments" element={<ManageTournaments />} />
        <Route path="news" element={<ManageNews />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="stats" element={<ManageStats />} />
        <Route path="team" element={<ManageTeam />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="quotes" element={<ManageQuotes />} />
        <Route path="account" element={<MyAccount />} />
      </Route>
    </Routes>
  );
}
