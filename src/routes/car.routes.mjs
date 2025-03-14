import { Router } from "express";
import { listarMarcas, listarModelos, crearUsuario } from "../controllers/car.controller.mjs";

/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con los autos.
 */
const router = Router();

router.get("/marcas", listarMarcas);
router.get("/modelos", listarModelos);
router.get("/user", crearUsuario);



export default router;