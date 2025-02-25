import { Router } from "express";
import authenticateToken from "../middlewares/authenticate.mjs";
import { registerUser } from "../controllers/user.controller..mjs";

const router = Router();

router.post("/agregarUsuario", authenticateToken, registerUser);

router.get("/editarUsuario", authenticateToken, (req, res) => {
    res.send("Editar Usuario");
});

router.get("/eliminarUsuario", authenticateToken, (req, res) => {
    res.send("Eliminar Usuario");
});

router.get("/listarUsuario", authenticateToken, (req, res) => {
    res.send("Listar Usuario");
});

export default router;