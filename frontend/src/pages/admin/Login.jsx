import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import ShieldLogo from '../../components/public/ShieldLogo';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { admin, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && admin) {
    const redirectTo = location.state?.from || '/admin';
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || '/admin', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo iniciar sesión.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-box">
        <div className="shield"><ShieldLogo size={64} showText={false} /></div>
        <h1>Panel de Administración</h1>
        <p className="subtitle">Inicia sesión para gestionar el contenido del sitio</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              id="login-email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-navy btn-block" disabled={submitting}>
            {submitting ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
