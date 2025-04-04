import { Router } from 'express';
import authenticateToken from '../middlewares/authenticate.mjs';

/**
 * @fileoverview Este módulo gestiona las rutas que no requiere autenticación.
 * ⚠️ Es solo un módulo de ejemplo.
*/

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/about', (req, res) => {
    res.send('About Us');
});

router.get('/contact', (req, res) => {
    res.send('Contact Us');
});

router.get('/services', authenticateToken, (req, res) => {
    const user = req.user;

    res.json({
        id: user.id,
        email: user.email
    });
});

router.get('/profile', authenticateToken, (req, res) => {
    const user = req.user;
    res.json({
        user
    });
});

export default router;