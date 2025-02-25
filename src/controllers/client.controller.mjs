import { validateRegisterCliente } from '../validators/cliente.validator.mjs';
import Cliente from '../models/cliente.model.mjs';
import AutoCliente from '../models/autoCliente.model.mjs';
import Auto from '../models/auto.model.mjs';
import User from '../models/user.model.mjs';
import Orden from '../models/orden.model.mjs';

// Registrar un cliente
async function registerClient(req, res, next) {
    try {
        const { nombre, direccion, telefono, correo, vehiculos } = req.body;
        const userId = req.user?.id;

        //valida los datos
        const result = await validateRegisterCliente(req.body);

        if (!result.isValid) {
            return res.json({ status: 'error', message: result.msg, alertType: 'error' });
        }

        // Si los datos son válidos, registra al cliente
        const cliente = await Cliente.create({ nombre, telefono, direccion, correo, creado_por: userId });

        if (cliente) {//si el cliente se crea con exito asigna los vehiculos
            const autosCreados = await Promise.all(
                vehiculos.map(async (vehiculo) => {
                    return await AutoCliente.create({
                        id_auto: vehiculo.modelo,
                        id_cliente: cliente.id,
                        patente: vehiculo.patente,
                        n_chasis: vehiculo.chasis,
                        color: null,
                    });
                })
            );

            res.status(201).json({ status: 'success', message: 'Cliente registrado con exito', data: { cliente: cliente, vehiculos: autosCreados }, alertType: 'success' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor', alertType: 'error' });
    }
}

// Listar todos los clientes
async function listClients(req, res, next) {
    try {
        const clientes = await Cliente.findAll({
            include: [
                { model: User, as: 'creador', attributes: ['name', 'lastname'] },
                {
                    model: AutoCliente, as: 'autos'
                    , include: [
                        { model: Auto, as: 'detalle' },
                        { model: Orden, as: 'ordenes' }
                    ]
                }
            ]
        });
        res.status(200).json({ status: 'success', clientes: clientes });
    } catch (error) {
        next(error);
    }
}

// Listar todos los clientes de un mecanico
async function listMechanicClients(req, res, next) {
    try {
        const mechanicId = req.body.mecanico;
        const clientes = await Cliente.findAll({
            where: { creado_por: mechanicId },
            include: [
                { model: User, as: 'creador', attributes: ['name', 'lastname'] },
                {
                    model: AutoCliente, as: 'autos'
                    , include: [
                        { model: Auto, as: 'detalle' },
                        { model: Orden, as: 'ordenes' }
                    ]
                }
            ]
        });
        res.status(200).json({ status: 'success', clientes: clientes });
    } catch (error) {
        console.log(error);

        next(error);
    }
}

export { registerClient, listClients, listMechanicClients };