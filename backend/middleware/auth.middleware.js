const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

/**
 * Verifica el token JWT enviado en la cookie httpOnly "token" o en el header
 * Authorization: Bearer <token>. Si es válido, adjunta el admin a req.admin.
 */
async function protect(req, res, next) {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'No autorizado. Inicia sesión para continuar.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query(
      'SELECT id, name, email, role FROM admins WHERE id = ? LIMIT 1',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'No autorizado. La cuenta ya no existe.' });
    }

    req.admin = rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Sesión inválida o expirada. Inicia sesión nuevamente.' });
  }
}

module.exports = { protect };
