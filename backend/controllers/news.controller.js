const { createCrudController } = require('./crudFactory');
const { slugify } = require('../utils/slugify');
const { pool } = require('../config/db');

async function ensureUniqueSlug(baseSlug, currentId) {
  let slug = baseSlug;
  let counter = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [rows] = await pool.query(
      'SELECT id FROM news WHERE slug = ? AND id != ? LIMIT 1',
      [slug, currentId || 0]
    );
    if (rows.length === 0) return slug;
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

const newsController = createCrudController('news', {
  fields: ['title', 'excerpt', 'content', 'published_at', 'active'],
  imageColumn: 'image_url',
  uploadFolder: 'news',
  orderBy: 'published_at DESC, id DESC',
  beforeSave: async (data, req, isUpdate) => {
    if (data.title) {
      const base = slugify(data.title);
      data.slug = await ensureUniqueSlug(base, isUpdate ? req.params.id : null);
    }
    return data;
  },
});

// GET /api/news/slug/:slug -> obtener una noticia por su slug (uso público para el detalle)
async function getBySlug(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM news WHERE slug = ? AND active = 1 LIMIT 1',
      [req.params.slug]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Noticia no encontrada.' });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { ...newsController, getBySlug };
