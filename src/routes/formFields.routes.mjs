import { Router } from "express";
const router = Router();
import { repuestos, servicios, clientes } from "../controllers/formFields.controller.mjs";

router.get("/repuestos", repuestos);
router.get("/servicios", servicios)
router.get("/clientes", clientes);
export default router;