import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaCog, FaImages, FaUsers, FaTrophy, FaNewspaper, FaPhotoVideo,
  FaChartBar, FaUserTie, FaEnvelope, FaFileInvoiceDollar, FaUserCircle, FaSignOutAlt, FaBars,
} from 'react-icons/fa';
import ShieldLogo from '../public/ShieldLogo';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { section: 'General' },
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/site-config', label: 'Configuración del sitio', icon: FaCog },
  { section: 'Contenido del sitio' },
  { to: '/admin/hero', label: 'Carrusel (Hero)', icon: FaImages },
  { to: '/admin/services', label: 'Servicios', icon: FaUsers },
  { to: '/admin/tournaments', label: 'Torneos', icon: FaTrophy },
  { to: '/admin/news', label: 'Noticias', icon: FaNewspaper },
  { to: '/admin/gallery', label: 'Galería', icon: FaPhotoVideo },
  { to: '/admin/stats', label: 'Estadísticas', icon: FaChartBar },
  { to: '/admin/team', label: 'Equipo', icon: FaUserTie },
  { section: 'Bandeja de entrada' },
  { to: '/admin/messages', label: 'Mensajes de contacto', icon: FaEnvelope },
  { to: '/admin/quotes', label: 'Cotizaciones', icon: FaFileInvoiceDollar },
  { section: 'Cuenta' },
  { to: '/admin/account', label: 'Mi cuenta', icon: FaUserCircle },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <ShieldLogo size={36} showText={false} />
          <div>
            <h2>FUNDACION</h2>
            <span>Panel Admin</span>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV_ITEMS.map((item, idx) =>
            item.section ? (
              <div className="nav-section-label" key={`section-${idx}`}>{item.section}</div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setSidebarOpen(false)}>
                <item.icon /> {item.label}
              </NavLink>
            )
          )}
        </nav>
        <div className="admin-sidebar-footer">
          <button className="btn btn-outline-navy btn-block" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-mobile-toggle icon-btn"
            style={{ display: 'none' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h1>Panel de Administración</h1>
          <div className="admin-user">
            <div className="avatar">{admin?.name?.charAt(0).toUpperCase() || 'A'}</div>
            <span>{admin?.name}</span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
