import { Router } from "express";
import authenticateToken from "../middlewares/authenticate.mjs";
import { register, listClients, listMechanicClients } from "../controllers/cliente.controller.mjs";

const router = Router();

router.get("/agregarCliente", authenticateToken, register);

router.get("/editarCliente", authenticateToken, (req, res) => {
  res.send("Editar Cliente");
});

router.get("/eliminarCliente", authenticateToken, (req, res) => {
  res.send("Eliminar Cliente");
});

router.get("/listarClientes", authenticateToken, listClients);

router.get("/listarClientesMecanico", authenticateToken, listMechanicClients);

export default router;