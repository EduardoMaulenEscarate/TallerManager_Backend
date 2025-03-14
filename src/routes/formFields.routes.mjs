import { Router } from "express";
import { repuestos, servicios, clientes } from "../controllers/formFields.controller.mjs";

/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con los campos de los formularios.
 * */
const router = Router();

router.get("/repuestos", repuestos);
router.get("/servicios", servicios)
router.get("/clientes", clientes);
export default router;