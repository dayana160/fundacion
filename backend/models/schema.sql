-- ============================================================
-- ESQUEMA DE BASE DE DATOS - FUNDACIÓN DEPORTIVA
-- Cada tabla corresponde a una sección administrable del sitio
-- ============================================================

-- Administradores del panel
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Configuración general del sitio (fila única, id = 1)
CREATE TABLE IF NOT EXISTS site_config (
  id INT PRIMARY KEY DEFAULT 1,
  site_name VARCHAR(150) NOT NULL DEFAULT 'FUNDACION',
  site_tagline VARCHAR(200) DEFAULT 'Formando Campeones para la Vida',
  logo_url VARCHAR(255) DEFAULT NULL,
  address VARCHAR(255) DEFAULT '',
  phone VARCHAR(50) DEFAULT '',
  email VARCHAR(150) DEFAULT '',
  facebook_url VARCHAR(255) DEFAULT '',
  instagram_url VARCHAR(255) DEFAULT '',
  youtube_url VARCHAR(255) DEFAULT '',
  twitter_url VARCHAR(255) DEFAULT '',
  footer_quote VARCHAR(255) DEFAULT '',
  footer_quote_highlight VARCHAR(120) DEFAULT '',
  about_mission TEXT,
  about_vision TEXT,
  about_history TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Diapositivas del carrusel principal (Hero)
CREATE TABLE IF NOT EXISTS hero_slides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  title_line1 VARCHAR(150) DEFAULT '',
  title_highlight VARCHAR(150) DEFAULT '',
  title_line2 VARCHAR(150) DEFAULT '',
  subtitle TEXT,
  button1_text VARCHAR(80) DEFAULT '',
  button1_link VARCHAR(255) DEFAULT '',
  button2_text VARCHAR(80) DEFAULT '',
  button2_link VARCHAR(255) DEFAULT '',
  order_index INT DEFAULT 0,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Servicios / tarjetas destacadas (se usan en Inicio y en la página Servicios)
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(50) DEFAULT 'FaRunning',
  title VARCHAR(150) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) DEFAULT NULL,
  show_on_home TINYINT(1) DEFAULT 1,
  order_index INT DEFAULT 0,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Torneos
CREATE TABLE IF NOT EXISTS tournaments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL,
  location VARCHAR(150) DEFAULT '',
  description TEXT,
  status ENUM('proximo','en_curso','finalizado') DEFAULT 'proximo',
  registration_link VARCHAR(255) DEFAULT '',
  order_index INT DEFAULT 0,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Noticias
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  image_url VARCHAR(255) DEFAULT NULL,
  excerpt VARCHAR(400) DEFAULT '',
  content TEXT,
  published_at DATE DEFAULT NULL,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Galería de imágenes
CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  caption VARCHAR(200) DEFAULT '',
  category VARCHAR(100) DEFAULT 'General',
  order_index INT DEFAULT 0,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Estadísticas (usadas en la barra inferior del inicio y en la página Estadísticas)
CREATE TABLE IF NOT EXISTS stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(50) DEFAULT 'FaTrophy',
  value VARCHAR(30) NOT NULL,
  label VARCHAR(150) NOT NULL,
  order_index INT DEFAULT 0,
  active TINYINT(1) DEFAULT 1
);

-- Equipo / cuerpo técnico (página Nosotros)
CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(150) DEFAULT '',
  photo_url VARCHAR(255) DEFAULT NULL,
  bio TEXT,
  order_index INT DEFAULT 0,
  active TINYINT(1) DEFAULT 1
);

-- Mensajes recibidos desde el formulario de Contacto
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50) DEFAULT '',
  subject VARCHAR(200) DEFAULT '',
  message TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Solicitudes recibidas desde "Cotiza con nosotros"
CREATE TABLE IF NOT EXISTS quote_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50) DEFAULT '',
  service_interest VARCHAR(150) DEFAULT '',
  message TEXT,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
