import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.mjs';

/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con la autenticación.
 */
const router = Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;
