const { pool } = require('../config/db');

/**
 * Genera un controlador CRUD estándar para una tabla simple.
 *
 * @param {string} table - nombre de la tabla en la base de datos
 * @param {object} options
 * @param {string[]} options.fields - columnas que se pueden crear/actualizar desde el body
 * @param {string|null} options.imageColumn - columna donde se guarda la ruta de la imagen subida (o null si no aplica)
 * @param {string} options.uploadFolder - carpeta dentro de /uploads donde se guardan las imágenes
 * @param {string} options.orderBy - cláusula ORDER BY para listar
 * @param {function} options.beforeSave - (data, req, isUpdate) => data  hook opcional para lógica extra (slugs, etc.)
 * @param {boolean} options.publicOnlyActive - si es true, las rutas públicas solo devuelven registros con active = 1
 */
function createCrudController(table, options) {
  const {
    fields,
    imageColumn = null,
    orderBy = 'order_index ASC, id DESC',
    beforeSave = (data) => data,
    publicOnlyActive = true,
  } = options;

  function pickFields(body) {
    const data = {};
    for (const f of fields) {
      if (body[f] !== undefined) data[f] = body[f] === '' ? null : body[f];
    }
    return data;
  }

  // GET /api/<recurso>  -> uso público, solo activos
  async function getAllPublic(req, res, next) {
    try {
      const sql = publicOnlyActive
        ? `SELECT * FROM ${table} WHERE active = 1 ORDER BY ${orderBy}`
        : `SELECT * FROM ${table} ORDER BY ${orderBy}`;
      const [rows] = await pool.query(sql);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/<recurso>/admin -> uso en panel admin, incluye inactivos
  async function getAllAdmin(req, res, next) {
    try {
      const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/<recurso>/:id
  async function getOne(req, res, next) {
    try {
      const [rows] = await pool.query(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ message: 'Registro no encontrado.' });
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/<recurso>
  async function create(req, res, next) {
    try {
      let data = pickFields(req.body);
      if (imageColumn && req.file) {
        data[imageColumn] = `/uploads/${options.uploadFolder}/${req.file.filename}`;
      }
      data = await beforeSave(data, req, false);

      const columns = Object.keys(data);
      if (columns.length === 0) {
        return res.status(400).json({ message: 'No se enviaron datos válidos.' });
      }
      const placeholders = columns.map(() => '?').join(', ');
      const values = columns.map((c) => data[c]);

      const [result] = await pool.query(
        `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
        values
      );

      const [rows] = await pool.query(`SELECT * FROM ${table} WHERE id = ?`, [result.insertId]);
      res.status(201).json(rows[0]);
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/<recurso>/:id
  async function update(req, res, next) {
    try {
      let data = pickFields(req.body);
      if (imageColumn && req.file) {
        data[imageColumn] = `/uploads/${options.uploadFolder}/${req.file.filename}`;
      }
      data = await beforeSave(data, req, true);

      const columns = Object.keys(data);
      if (columns.length === 0) {
        return res.status(400).json({ message: 'No se enviaron datos para actualizar.' });
      }
      const setClause = columns.map((c) => `${c} = ?`).join(', ');
      const values = columns.map((c) => data[c]);

      const [result] = await pool.query(
        `UPDATE ${table} SET ${setClause} WHERE id = ?`,
        [...values, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Registro no encontrado.' });
      }

      const [rows] = await pool.query(`SELECT * FROM ${table} WHERE id = ?`, [req.params.id]);
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/<recurso>/:id
  async function remove(req, res, next) {
    try {
      const [result] = await pool.query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Registro no encontrado.' });
      }
      res.json({ message: 'Registro eliminado correctamente.' });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/<recurso>/:id/active
  async function toggleActive(req, res, next) {
    try {
      const [rows] = await pool.query(`SELECT active FROM ${table} WHERE id = ?`, [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ message: 'Registro no encontrado.' });
      const newValue = rows[0].active ? 0 : 1;
      await pool.query(`UPDATE ${table} SET active = ? WHERE id = ?`, [newValue, req.params.id]);
      res.json({ active: newValue });
    } catch (error) {
      next(error);
    }
  }

  return { getAllPublic, getAllAdmin, getOne, create, update, remove, toggleActive };
}

module.exports = { createCrudController };
