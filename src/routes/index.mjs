import { Router } from 'express';
import authRoutes from './auth.routes.mjs';
import homeRoutes from './home.routes.mjs';

const router = Router();

router.use('/', homeRoutes);
router.use('/auth', authRoutes);




router.use('*', (req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default router;
