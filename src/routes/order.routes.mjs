import { Router } from "express";
import { upload } from "../middlewares/upload.mjs";
import authenticateToken from "../middlewares/authenticate.mjs";
import { validateOrderForm } from "../middlewares/validations/order.validation.mjs";
import { normalizer } from "../middlewares/normalizer.mjs";
import { registerOrder } from "../controllers/order.controller.mjs";
/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con las ordenes.
 */

const router = Router();

router.post('/', 
    authenticateToken,
    normalizer(["spareParts", "spareParts_prices", "quantitys", "services", "services_prices"]), 
    validateOrderForm, 
    upload.array('photos'), 
    registerOrder);

router.put('/orden/:id', upload.array('photos'), registerOrder);
router.delete('/orden/:id', registerOrder);
router.get('/orden/:id', registerOrder);

async function test(req, res) {
    console.log(req.body);
    
    console.log("Hello, World!");

    res.status(200).json({ message: 'Hello, World!' });
}



export default router;