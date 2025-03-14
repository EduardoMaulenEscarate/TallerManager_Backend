import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Obtener la ruta del directorio actual (equivalente a __dirname)
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Directorio donde se guardarán los archivos
const uploadDir = path.join(__dirname, '../../public/uploads');

// Verificar si la carpeta existe, si no, crearla
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Ruta absoluta hacia 'public/uploads'
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para evitar sobreescritura
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limitar tamaño de archivo a 10MB
});

export default upload;
