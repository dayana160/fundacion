const { pool } = require('../config/db');

// GET /api/dashboard/summary  (admin)
async function getSummary(req, res, next) {
  try {
    const queries = {
      hero_slides: 'SELECT COUNT(*) AS total FROM hero_slides',
      services: 'SELECT COUNT(*) AS total FROM services',
      tournaments: 'SELECT COUNT(*) AS total FROM tournaments',
      news: 'SELECT COUNT(*) AS total FROM news',
      gallery: 'SELECT COUNT(*) AS total FROM gallery',
      team_members: 'SELECT COUNT(*) AS total FROM team_members',
      contact_messages: 'SELECT COUNT(*) AS total FROM contact_messages',
      unread_messages: 'SELECT COUNT(*) AS total FROM contact_messages WHERE is_read = 0',
      quote_requests: 'SELECT COUNT(*) AS total FROM quote_requests',
      unread_quotes: 'SELECT COUNT(*) AS total FROM quote_requests WHERE is_read = 0',
    };

    const summary = {};
    for (const [key, sql] of Object.entries(queries)) {
      const [rows] = await pool.query(sql);
      summary[key] = rows[0].total;
    }

    res.json(summary);
  } catch (error) {
    next(error);
  }
}

module.exports = { getSummary };
