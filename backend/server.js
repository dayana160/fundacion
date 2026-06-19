require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const { testConnection } = require('./config/db');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

// ---------- Middlewares globales ----------
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------- Archivos estáticos (imágenes subidas por el admin) ----------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- Rutas de la API ----------
app.get('/', (req, res) => {
  res.json({ message: 'API de la Fundación Deportiva funcionando correctamente 🟢' });
});
app.use('/api', apiRoutes);

// ---------- Manejo de errores ----------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
  testConnection();
});
