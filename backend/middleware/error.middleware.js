function notFound(req, res, next) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('🔥 Error:', err.message);

  if (err.name === 'MulterError') {
    return res.status(400).json({ message: `Error al subir archivo: ${err.message}` });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Ya existe un registro con ese valor único.' });
  }

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
  });
}

module.exports = { notFound, errorHandler };
