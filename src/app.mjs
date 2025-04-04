import express, { json } from 'express';
import router from './routes/index.mjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authenticateToken from './middlewares/authenticate.mjs';
const app = express();

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/uploads/order', authenticateToken, express.static('public/uploads/order'));

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

export default app;
