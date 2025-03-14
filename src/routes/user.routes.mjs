import { Router } from "express";
import authenticateToken from "../middlewares/authenticate.mjs";
import { registerUser, listUsers, getUserById, updateUser } from "../controllers/user.controller..mjs";

/**
 * @fileoverview Este módulo gestiona las rutas relacionadas con los usuarios.
 * */

const router = Router();

router.post("/agregarUsuario", authenticateToken, registerUser);
router.get("/detalle/:id", authenticateToken, getUserById);
router.put("/editar", authenticateToken, updateUser);
router.get("/listarUsuarios", authenticateToken, listUsers);

export default router;