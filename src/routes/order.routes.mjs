import { Router } from "express";
import { upload } from "../middlewares/upload.mjs";
import authenticateToken from "../middlewares/authenticate.mjs";
import { validateOrderForm } from "../middlewares/validations/order.validation.mjs";
import { normalizer } from "../middlewares/normalizer.mjs";
import { registerOrder, getAllOrders } from "../controllers/order.controller.mjs";
/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con las ordenes.
 */

const router = Router();

router.post('/', 
    authenticateToken,
    upload.array('photos'), 
    normalizer(["spareParts", "spareParts_prices", "quantitys", "services", "services_prices"]), 
    validateOrderForm, 
    registerOrder);

router.get('/', authenticateToken, getAllOrders);
// router.put('/:id', upload.array('photos'), registerOrder);
// router.delete('/:id', registerOrder);
// router.get('/:id', registerOrder);

export default router;