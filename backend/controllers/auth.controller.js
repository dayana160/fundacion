const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { generateToken, sendTokenCookie } = require('../utils/token');

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
    }

    const [rows] = await pool.query('SELECT * FROM admins WHERE email = ? LIMIT 1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const token = generateToken(admin.id);
    sendTokenCookie(res, token);

    res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/logout
function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Sesión cerrada correctamente.' });
}

// GET /api/auth/me
function me(req, res) {
  res.json({ admin: req.admin });
}

// PUT /api/auth/password
async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Debes indicar la contraseña actual y la nueva.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres.' });
    }

    const [rows] = await pool.query('SELECT * FROM admins WHERE id = ? LIMIT 1', [req.admin.id]);
    const admin = rows[0];
    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) {
      return res.status(401).json({ message: 'La contraseña actual no es correcta.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE admins SET password = ? WHERE id = ?', [hashed, req.admin.id]);
    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/auth/profile
async function updateProfile(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Nombre y correo son obligatorios.' });
    }
    await pool.query('UPDATE admins SET name = ?, email = ? WHERE id = ?', [name, email, req.admin.id]);
    res.json({ message: 'Perfil actualizado correctamente.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, logout, me, changePassword, updateProfile };
