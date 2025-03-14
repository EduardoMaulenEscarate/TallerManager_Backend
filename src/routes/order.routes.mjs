import { Router } from "express";

/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con las ordenes.
 */

const router = Router();

router.post('/agregarOrden', test);

async function test({ res }) {
    console.log("Hello, World!");

    res.status(200).json({ message: 'Hello, World!' });
}



export default router;