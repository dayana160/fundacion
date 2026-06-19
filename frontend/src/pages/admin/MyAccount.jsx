import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/resources';

export default function MyAccount() {
  const { admin, setAdmin } = useAuth();
  const [profile, setProfile] = useState({ name: admin?.name || '', email: admin?.email || '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await authService.updateProfile(profile.name, profile.email);
      setAdmin((prev) => ({ ...prev, ...profile }));
      Swal.fire({ icon: 'success', title: 'Perfil actualizado', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'No se pudo actualizar el perfil.' });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Las contraseñas no coinciden' });
      return;
    }
    setSavingPassword(true);
    try {
      await authService.changePassword(passwords.currentPassword, passwords.newPassword);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      Swal.fire({ icon: 'success', title: 'Contraseña actualizada', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'No se pudo actualizar la contraseña.' });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 560 }}>
      <div className="panel">
        <div className="panel-header"><h2>Mi perfil</h2></div>
        <div className="panel-body">
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="profile-name">Nombre</label>
              <input id="profile-name" className="form-control" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="profile-email">Correo electrónico</label>
              <input id="profile-email" type="email" className="form-control" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-navy" disabled={savingProfile}>
                {savingProfile ? 'Guardando...' : 'Guardar perfil'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header"><h2>Cambiar contraseña</h2></div>
        <div className="panel-body">
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="current-password">Contraseña actual</label>
              <input id="current-password" type="password" className="form-control" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">Nueva contraseña</label>
              <input id="new-password" type="password" className="form-control" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} required minLength={6} />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar nueva contraseña</label>
              <input id="confirm-password" type="password" className="form-control" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} required minLength={6} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-navy" disabled={savingPassword}>
                {savingPassword ? 'Guardando...' : 'Actualizar contraseña'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
