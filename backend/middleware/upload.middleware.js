const multer = require('multer');
const path = require('path');
const fs = require('fs');

const baseUploadDir = path.join(__dirname, '..', 'uploads');

// Crea dinámicamente una carpeta de subida dentro de /uploads según la sección
function makeStorage(subfolder) {
  const dir = path.join(baseUploadDir, subfolder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, unique);
    },
  });
}

const allowedTypes = /jpeg|jpg|png|webp|gif|svg/;

function fileFilter(req, file, cb) {
  const extOk = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowedTypes.test(file.mimetype);
  if (extOk && mimeOk) {
    return cb(null, true);
  }
  cb(new Error('Formato de imagen no permitido. Usa JPG, PNG, WEBP, GIF o SVG.'));
}

function uploadFor(subfolder) {
  return multer({
    storage: makeStorage(subfolder),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  });
}

// Para recursos sin imagen, el formulario del admin igualmente envía
// multipart/form-data (por consistencia en el frontend). Este parser
// solo procesa los campos de texto, sin esperar ningún archivo.
const parseFieldsOnly = multer().none();

module.exports = { uploadFor, parseFieldsOnly };
