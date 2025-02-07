import { Router } from "express";
import authenticateToken from "../middlewares/authenticate.mjs";

const router = Router();

router.get("/agregarCliente", authenticateToken, (req, res) => {
  res.send("Agregar Cliente");
});

router.get("/editarCliente", authenticateToken, (req, res) => {
  res.send("Editar Cliente");
});

router.get("/eliminarCliente", authenticateToken, (req, res) => {
  res.send("Eliminar Cliente");
});

router.get("/listarClientes", authenticateToken, (req, res) => {
  res.send("Listar Clientes");
});

export default router;