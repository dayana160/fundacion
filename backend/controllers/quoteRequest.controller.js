const { pool } = require('../config/db');

// POST /api/quote-requests  (público - botón "Cotiza con nosotros")
async function create(req, res, next) {
  try {
    const { name, email, phone, service_interest, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Nombre y correo son obligatorios.' });
    }
    const [result] = await pool.query(
      'INSERT INTO quote_requests (name, email, phone, service_interest, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || '', service_interest || '', message || '']
    );
    res.status(201).json({ id: result.insertId, message: 'Tu solicitud fue enviada. Nos pondremos en contacto pronto.' });
  } catch (error) {
    next(error);
  }
}

// GET /api/quote-requests  (admin)
async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM quote_requests ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

// PATCH /api/quote-requests/:id/read  (admin)
async function markRead(req, res, next) {
  try {
    await pool.query('UPDATE quote_requests SET is_read = 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Solicitud marcada como leída.' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/quote-requests/:id  (admin)
async function remove(req, res, next) {
  try {
    const [result] = await pool.query('DELETE FROM quote_requests WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Solicitud no encontrada.' });
    res.json({ message: 'Solicitud eliminada.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, getAll, markRead, remove };
