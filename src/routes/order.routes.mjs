import { Router } from "express";
import { upload } from "../middlewares/upload.mjs";
import authenticateToken from "../middlewares/authenticate.mjs";
import { validateForm, extraFormValidationOnEdit } from "../middlewares/validations/order.validation.mjs";
import { normalizer } from "../middlewares/normalizer.mjs";
import { registerOrder, getAllOrders, getOrder, updateOrder } from "../controllers/order.controller.mjs";
import express from 'express';
import app from "../app.mjs";
/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con las ordenes.
 */

const router = Router();

router.post('/', 
    authenticateToken,
    upload.array('photos'), 
    normalizer(["spareParts", "spareParts_prices", "quantitys", "services", "services_prices"]), 
    validateForm, 
    registerOrder);

router.get('/', authenticateToken, getAllOrders);
router.get('/ver/:id', authenticateToken, getOrder);

router.put('/:id',
    authenticateToken,
    upload.array('photos'), 
    normalizer(["spareParts", "spareParts_prices", "quantitys", "services", "services_prices"]), 
    validateForm,
    extraFormValidationOnEdit, 
    updateOrder);

// router.delete('/:id', registerOrder);
// router.get('/:id', registerOrder);


export default router;