const { pool } = require('../config/db');

// POST /api/contact-messages  (público - formulario de contacto)
async function create(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nombre, correo y mensaje son obligatorios.' });
    }
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || '', subject || '', message]
    );
    res.status(201).json({ id: result.insertId, message: 'Tu mensaje fue enviado correctamente. Te contactaremos pronto.' });
  } catch (error) {
    next(error);
  }
}

// GET /api/contact-messages  (admin)
async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

// PATCH /api/contact-messages/:id/read  (admin)
async function markRead(req, res, next) {
  try {
    await pool.query('UPDATE contact_messages SET is_read = 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Mensaje marcado como leído.' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/contact-messages/:id  (admin)
async function remove(req, res, next) {
  try {
    const [result] = await pool.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Mensaje no encontrado.' });
    res.json({ message: 'Mensaje eliminado.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, getAll, markRead, remove };
