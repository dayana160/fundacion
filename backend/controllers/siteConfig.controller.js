const { pool } = require('../config/db');

// GET /api/site-config  (público)
async function getConfig(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM site_config WHERE id = 1 LIMIT 1');
    res.json(rows[0] || {});
  } catch (error) {
    next(error);
  }
}

// PUT /api/site-config  (admin)
async function updateConfig(req, res, next) {
  try {
    const fields = [
      'site_name', 'site_tagline', 'address', 'phone', 'email',
      'facebook_url', 'instagram_url', 'youtube_url', 'twitter_url',
      'footer_quote', 'footer_quote_highlight',
      'about_mission', 'about_vision', 'about_history',
    ];

    const updates = [];
    const values = [];
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    }

    if (req.file) {
      updates.push('logo_url = ?');
      values.push(`/uploads/site/${req.file.filename}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No se enviaron datos para actualizar.' });
    }

    const sql = `UPDATE site_config SET ${updates.join(', ')} WHERE id = 1`;
    await pool.query(sql, values);

    const [rows] = await pool.query('SELECT * FROM site_config WHERE id = 1 LIMIT 1');
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { getConfig, updateConfig };
