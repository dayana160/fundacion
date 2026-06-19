/**
 * Script de inicialización de la base de datos.
 * Crea las tablas (si no existen) y carga datos de ejemplo para que el sitio
 * no se vea vacío la primera vez. Es seguro ejecutarlo varias veces.
 *
 * Uso:  npm run seed
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

async function run() {
  console.log('⏳ Creando tablas...');
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  const statements = schema
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const stmt of statements) {
    await pool.query(stmt);
  }
  console.log('✅ Tablas listas.');

  // ---------- Administrador inicial ----------
  const [admins] = await pool.query('SELECT id FROM admins LIMIT 1');
  if (admins.length === 0) {
    const name = process.env.ADMIN_NAME || 'Administrador';
    const email = process.env.ADMIN_EMAIL || 'admin@fundaciondeportiva.org';
    const plainPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const hashed = await bcrypt.hash(plainPassword, 10);
    await pool.query(
      'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, 'superadmin']
    );
    console.log(`✅ Administrador creado -> ${email} / ${plainPassword}`);
  } else {
    console.log('ℹ️  Ya existe al menos un administrador, se omite la creación.');
  }

  // ---------- Configuración del sitio ----------
  const [config] = await pool.query('SELECT id FROM site_config WHERE id = 1');
  if (config.length === 0) {
    await pool.query(
      `INSERT INTO site_config
        (id, site_name, site_tagline, address, phone, email, facebook_url, instagram_url, youtube_url, twitter_url,
         footer_quote, footer_quote_highlight, about_mission, about_vision, about_history)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'FUNDACION',
        'Formando Campeones para la Vida',
        'Av. Los Deportistas 123, Guayaquil, Ecuador',
        '099 123 4567',
        'info@fundaciondeportiva.org',
        'https://facebook.com',
        'https://instagram.com',
        'https://youtube.com',
        'https://twitter.com',
        'No se trata de ser el mejor, se trata de ser',
        'mejor que ayer.',
        'Impulsar el talento deportivo de niños y jóvenes a través de programas de formación integral que combinan disciplina, valores y desarrollo humano.',
        'Ser la fundación deportiva líder en la región, reconocida por formar no solo grandes deportistas, sino mejores personas para la sociedad.',
        'Nuestra fundación nació con el sueño de transformar vidas a través del deporte, brindando oportunidades a niños y jóvenes sin importar su condición económica.',
      ]
    );
    console.log('✅ Configuración del sitio creada.');
  }

  // ---------- Hero slides ----------
  const [hero] = await pool.query('SELECT id FROM hero_slides');
  if (hero.length === 0) {
    await pool.query(
      `INSERT INTO hero_slides
        (image_url, title_line1, title_highlight, title_line2, subtitle, button1_text, button1_link, button2_text, button2_link, order_index, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        '/uploads/hero/hero-default.jpg',
        'FORMAMOS',
        'DEPORTISTAS',
        'Y MEJORES PERSONAS',
        'En nuestra fundación impulsamos el talento, la disciplina y los valores a través del deporte.',
        'CONÓCENOS',
        '/nosotros',
        'NUESTROS SERVICIOS',
        '/servicios',
        1,
        1,
      ]
    );
    console.log('✅ Diapositiva de inicio creada.');
  }

  // ---------- Servicios / tarjetas destacadas ----------
  const [services] = await pool.query('SELECT id FROM services');
  if (services.length === 0) {
    const data = [
      ['FaRunning', 'Formación Deportiva', 'Programas de entrenamiento para todas las edades.', 1],
      ['FaUsers', 'Valores', 'Inculcamos respeto, disciplina, trabajo en equipo y humildad.', 2],
      ['FaTrophy', 'Competiciones', 'Participamos en torneos locales y nacionales.', 3],
      ['FaHeart', 'Apoyo Integral', 'Acompañamiento psicológico, académico y nutricional.', 4],
    ];
    for (const [icon, title, description, order_index] of data) {
      await pool.query(
        'INSERT INTO services (icon, title, description, show_on_home, order_index, active) VALUES (?, ?, ?, 1, ?, 1)',
        [icon, title, description, order_index]
      );
    }
    console.log('✅ Servicios de ejemplo creados.');
  }

  // ---------- Torneos ----------
  const [tournaments] = await pool.query('SELECT id FROM tournaments');
  if (tournaments.length === 0) {
    await pool.query(
      `INSERT INTO tournaments (title, image_url, start_date, end_date, location, description, status, order_index, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Copa Fundación 2024',
        '/uploads/tournaments/torneo-default.jpg',
        '2024-06-15',
        '2024-06-30',
        'Guayaquil, Ecuador',
        'El torneo más importante de nuestra fundación, donde participan todas nuestras categorías formativas.',
        'proximo',
        1,
        1,
      ]
    );
    console.log('✅ Torneo de ejemplo creado.');
  }

  // ---------- Noticias ----------
  const [news] = await pool.query('SELECT id FROM news');
  if (news.length === 0) {
    await pool.query(
      `INSERT INTO news (title, slug, image_url, excerpt, content, published_at, active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        'Nuestra categoría sub-15 campeona invicta',
        'categoria-sub-15-campeona-invicta',
        '/uploads/news/noticia-default.jpg',
        'Un excelente desempeño de nuestros jóvenes talentos nos llena de orgullo...',
        'Un excelente desempeño de nuestros jóvenes talentos nos llena de orgullo. El equipo sub-15 de la fundación logró coronarse campeón del torneo interclubes sin perder ningún partido, demostrando el nivel de formación deportiva y los valores inculcados durante todo el proceso.',
        '2024-05-20',
        1,
      ]
    );
    console.log('✅ Noticia de ejemplo creada.');
  }

  // ---------- Estadísticas ----------
  const [stats] = await pool.query('SELECT id FROM stats');
  if (stats.length === 0) {
    const data = [
      ['FaCalendarAlt', '15+', 'Años de experiencia', 1],
      ['FaUserFriends', '800+', 'Deportistas formados', 2],
      ['FaTrophy', '50+', 'Torneos ganados', 3],
    ];
    for (const [icon, value, label, order_index] of data) {
      await pool.query(
        'INSERT INTO stats (icon, value, label, order_index, active) VALUES (?, ?, ?, ?, 1)',
        [icon, value, label, order_index]
      );
    }
    console.log('✅ Estadísticas de ejemplo creadas.');
  }

  console.log('🎉 Proceso de inicialización completado.');
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Error durante la inicialización:', err);
  process.exit(1);
});
