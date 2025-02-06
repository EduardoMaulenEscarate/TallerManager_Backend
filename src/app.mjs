import express, { json } from 'express';
import router from './routes/index.mjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware para analizar cookies
app.use(cookieParser());

// Configuración de CORS para permitir solo un origen específico
app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con el dominio de tu frontend
  credentials: true // Permite enviar cookies o encabezados de autorización
}));


app.use(json());

app.use('/api', router);

export default app;
