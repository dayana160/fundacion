# FUNDACION DEPORTIVA — Sistema Web con Panel de Administración

Sitio web completo para una fundación deportiva con **panel de administración** que permite al administrador gestionar **todas** las secciones del sitio sin tocar código.

---

## 📋 Tecnologías

| Capa | Stack |
|---|---|
| **Frontend** | React 18 + Vite + React Router 7 + Axios + react-icons + SweetAlert2 |
| **Backend** | Node.js + Express 5 + MySQL2 + Multer + JWT + bcryptjs |
| **Base de datos** | MySQL / MariaDB |

---

## 🗂️ Estructura del proyecto

```
FUNDACION/
├── backend/
│   ├── config/          → Conexión a la base de datos
│   ├── controllers/     → Lógica de cada endpoint
│   ├── middleware/      → JWT, subida de imágenes, manejo de errores
│   ├── models/
│   │   ├── schema.sql   → Esquema completo de la BD
│   │   └── seed.js      → Script de inicialización con datos de ejemplo
│   ├── routes/          → Rutas de la API REST
│   ├── uploads/         → Imágenes subidas por el admin (creada automáticamente)
│   ├── .env             → Variables de entorno (configura aquí tu BD)
│   ├── package.json
│   └── server.js        → Punto de entrada del servidor
└── frontend/
    ├── public/          → Favicon
    ├── src/
    │   ├── components/  → Componentes React (público y admin)
    │   ├── context/     → AuthContext (sesión del admin)
    │   ├── css/         → Hojas de estilo completas
    │   ├── pages/       → Páginas públicas y del panel admin
    │   └── services/    → Capa de comunicación con la API
    ├── .env             → URL de la API (apunta al backend)
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Instalación paso a paso

### 1. Base de datos

Crea la base de datos en MySQL/MariaDB:

```sql
CREATE DATABASE fundacion_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'fundacion_user'@'localhost' IDENTIFIED BY 'cambia_esta_clave';
GRANT ALL PRIVILEGES ON fundacion_db.* TO 'fundacion_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend

```bash
cd backend

# Copia y edita las variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de BD, el JWT_SECRET y las credenciales del admin inicial

npm install

# Crea las tablas e inserta datos de ejemplo
npm run seed

# Inicia el servidor
npm run dev       # desarrollo (con nodemon, recarga automática)
# ó
npm start         # producción
```

El servidor queda en **http://localhost:4000**

### 3. Frontend

```bash
cd frontend

# Copia y edita las variables de entorno
cp .env.example .env
# Edita VITE_API_URL=http://localhost:4000/api
# Edita VITE_UPLOADS_URL=http://localhost:4000

npm install
npm run dev       # desarrollo en http://localhost:5173
```

### 4. Producción

```bash
cd frontend
npm run build     # genera la carpeta dist/
# Sirve dist/ con Nginx, Apache o cualquier hosting estático
```

---

## 🔐 Acceso al panel de administración

Una vez que el servidor esté corriendo, visita:

```
http://localhost:5173/admin/login
```

Usa las credenciales que configuraste en `.env` antes de ejecutar `npm run seed` (por defecto):

- **Email:** `admin@fundaciondeportiva.org`
- **Contraseña:** `Admin123!`

> ⚠️ **Cambia la contraseña desde el panel tras el primer acceso** (`Mi cuenta → Cambiar contraseña`).

---

## 🎛️ Secciones administrables

| Sección del panel | Qué puedes hacer |
|---|---|
| **Configuración del sitio** | Nombre, eslogan, logo, contacto, redes sociales, misión, visión, historia, frase del footer |
| **Carrusel (Hero)** | Agregar / editar / eliminar diapositivas con imagen, texto y botones |
| **Servicios** | CRUD completo, ícono, descripción, imagen, visibilidad en Inicio |
| **Torneos** | CRUD completo, estado (próximo / en curso / finalizado), fechas, lugar, imagen |
| **Noticias** | CRUD completo, imagen, contenido, slug automático, fecha de publicación |
| **Galería** | Subir / gestionar fotos con categoría y descripción (filtrado en el sitio público) |
| **Estadísticas** | CRUD de los números destacados (15+ años, 800+ deportistas, etc.) |
| **Equipo** | CRUD del cuerpo técnico con foto, nombre y cargo |
| **Mensajes de contacto** | Leer / eliminar mensajes del formulario de contacto |
| **Cotizaciones** | Leer / eliminar solicitudes del botón "Cotiza con nosotros" |
| **Mi cuenta** | Cambiar nombre, email y contraseña del administrador |

---

## 🌐 Páginas públicas del sitio

| URL | Descripción |
|---|---|
| `/` | Inicio: carrusel, servicios destacados, torneo, noticia y galería |
| `/nosotros` | Misión, visión, historia y equipo |
| `/servicios` | Tarjetas de todos los servicios |
| `/torneos` | Listado completo de torneos con estado y fechas |
| `/noticias` | Listado de noticias con imagen y resumen |
| `/noticias/:slug` | Detalle de una noticia individual |
| `/galeria` | Galería de fotos con filtro por categoría |
| `/estadisticas` | Tarjetas de estadísticas |
| `/contacto` | Formulario de contacto funcional |
| `/admin/login` | Login del panel de administración |
| `/admin/*` | Panel de administración (protegido por JWT) |

---

## 🔌 API REST

Base URL: `http://localhost:4000/api`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/auth/login` | No | Iniciar sesión |
| POST | `/auth/logout` | No | Cerrar sesión |
| GET | `/auth/me` | Sí | Datos del admin actual |
| PUT | `/auth/password` | Sí | Cambiar contraseña |
| PUT | `/auth/profile` | Sí | Actualizar perfil |
| GET | `/site-config` | No | Configuración del sitio |
| PUT | `/site-config` | Sí | Actualizar configuración |
| GET | `/hero` | No | Diapositivas activas |
| GET/POST/PUT/DELETE | `/hero/*` | Mixto | CRUD carrusel |
| GET | `/services` | No | Servicios activos |
| … | `/tournaments`, `/news`, `/gallery`, `/stats`, `/team` | Mixto | CRUD de cada recurso |
| GET | `/news/slug/:slug` | No | Noticia por slug |
| POST | `/contact-messages` | No | Enviar mensaje de contacto |
| GET | `/contact-messages` | Sí | Listar mensajes |
| POST | `/quote-requests` | No | Enviar solicitud de cotización |
| GET | `/quote-requests` | Sí | Listar solicitudes |
| GET | `/dashboard/summary` | Sí | Resumen del dashboard |

---

## 🗄️ Variables de entorno del backend (`.env`)

```env
PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=fundacion_user
DB_PASSWORD=tu_clave_de_bd
DB_NAME=fundacion_db

JWT_SECRET=clave_secreta_muy_larga_y_aleatoria
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

# Solo para el primer npm run seed:
ADMIN_NAME=Administrador
ADMIN_EMAIL=admin@fundaciondeportiva.org
ADMIN_PASSWORD=Admin123!
```

## ⚙️ Variables de entorno del frontend (`.env`)

```env
VITE_API_URL=http://localhost:4000/api
VITE_UPLOADS_URL=http://localhost:4000
```

---

## 📦 Colores de la marca

| Variable CSS | Valor | Uso |
|---|---|---|
| `--navy-900` | `#0c1a3a` | Fondo principal, navbar, botones |
| `--gold-500` | `#f5b400` | Acentos, texto destacado, botón CTA |
| `--green-600` | `#3fa34d` | Indicador de sección activa, botón "Ver" |
| `--white` | `#ffffff` | Fondo tarjetas, texto sobre navy |

---

## 🛠️ Scripts disponibles

**Backend:**
```bash
npm start       # Inicia el servidor (producción)
npm run dev     # Inicia con nodemon (desarrollo)
npm run seed    # Crea las tablas e inserta datos de ejemplo
```

**Frontend:**
```bash
npm run dev     # Servidor de desarrollo con HMR
npm run build   # Compilación de producción (genera dist/)
npm run preview # Vista previa del build de producción
```
