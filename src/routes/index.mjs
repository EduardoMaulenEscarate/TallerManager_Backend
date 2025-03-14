import { Router } from 'express';
import authRoutes from './auth.routes.mjs';
import homeRoutes from './home.routes.mjs';
import clienteRoutes from './client.routes.mjs';
import userRoutes from './user.routes.mjs';
import carRoutes from './car.routes.mjs';
import formfieldsRoutes from './formFields.routes.mjs';
import orderRoutes from './order.routes.mjs';
const router = Router();

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/cliente', clienteRoutes);
router.use('/usuario', userRoutes);
router.use('/auto', carRoutes);
router.use('/campos', formfieldsRoutes);
router.use('/order', orderRoutes);

router.use('*', (req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default router;
