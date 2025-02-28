import { Router } from "express";
import authenticateToken from "../middlewares/authenticate.mjs";
import { registerClient, updateClient, listClients, listMechanicClients, getClientById } from "../controllers/client.controller.mjs";

const router = Router();

router.post("/agregarCliente", authenticateToken, registerClient);

router.get("/detalle/:id", authenticateToken, getClientById);

router.get("/eliminarCliente", authenticateToken, (req, res) => {
  res.send("Eliminar Cliente");
});

router.get("/listarClientes", authenticateToken, listClients);

router.get("/listarClientesMecanico", authenticateToken, listMechanicClients);

router.put("/editar", authenticateToken, updateClient);

export default router;