import { Router } from "express";
import { upload } from "../middlewares/upload.mjs";
import { registerOrder } from "../controllers/order.controller.mjs";
/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con las ordenes.
 */

const router = Router();

// router.post('/agregarOrden', upload.array("photos", 10),  uploadFiles);
router.post('/agregarOrden', upload.array('photos'), registerOrder);

async function test(req, res) {
    console.log(req.body);
    
    console.log("Hello, World!");

    res.status(200).json({ message: 'Hello, World!' });
}



export default router;