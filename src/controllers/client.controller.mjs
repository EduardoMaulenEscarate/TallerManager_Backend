import { validateRegisterCliente } from '../validators/cliente.validator.mjs';
import Cliente from '../models/cliente.model.mjs';
import AutoCliente from '../models/autoCliente.model.mjs';
import Auto from '../models/auto.model.mjs';
import User from '../models/user.model.mjs';
import Orden from '../models/orden.model.mjs';
import Marca from '../models/marca.model.mjs';
import clientService from '../services/client.service.mjs';
import vehicleService from '../services/vehicle.service.mjs';

/**
 * @fileoverview Gestiona las operaciones relacionadas con los clientes.
 */

/**
 * Registra un cliente si los datos son válidos.
 * @returns {Object} Cliente registrado.
 * */
const registerClient = async (req, res) => {
    try {
        const { nombre, direccion, telefono, correo, vehiculos } = req.body;
        const userId = req.user?.id;

        const result = await validateRegisterCliente(req.body);

        if (!result.isValid) {
            return res.json({ status: 'error', message: result.msg, alertType: 'error' });
        }

        const correoNormalizado = correo.trim().toLowerCase();

        let existingClient = await clientService.getClientByPhone(telefono);

        if (existingClient) {
            return res.json({ status: 'error', message: 'Ya existe un cliente con ese telefono', alertType: 'error' });
        }

        existingClient = await clientService.getClientByMail(correo);

        if (existingClient) {
            return res.json({ status: 'error', message: 'Ya existe un cliente con ese correo', alertType: 'error' });
        }

        const cliente = await Cliente.create({ nombre, telefono, direccion, correo: correoNormalizado, creado_por: userId });

        if (cliente) {
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

/**
 * Actualiza la información de un cliente.
 * @returns {Object} Cliente actualizado.
 */ 
const updateClient = async (req, res) => {
    try {
        const { nombre, direccion, telefono, correo, vehiculos, id } = req.body;
        const userId = req.user?.id;

        const result = await validateRegisterCliente(req.body);

        if (!result.isValid) {
            return res.json({ status: 'error', message: result.msg, alertType: 'error' });
        }

        const correoNormalizado = correo.trim().toLowerCase();

        let existingClient = await clientService.getClientByPhone(telefono);

        if (existingClient && existingClient.id !== id) {
            return res.json({ status: 'error', message: 'Ya existe un cliente con ese telefono', alertType: 'error' });
        }

        if (correo !== "") {
            existingClient = await clientService.getClientByMail(correoNormalizado);

            if (existingClient && existingClient.id !== id) {
                return res.json({ status: 'error', message: 'Ya existe un cliente con ese correo', alertType: 'error' });
            }
        }

        const cliente = await Cliente.update({ nombre, telefono, direccion, correo, creado_por: userId }, { where: { id: id } });

        if (cliente) {
            const vehiculosActuales = await vehicleService.getClientVehicles(id);

            // Crear un conjunto de IDs de vehículos enviados para búsqueda rápida
            const idsVehiculosEnviados = new Set(
                vehiculos
                    .filter(v => v.id_auto_cliente)
                    .map(v => v.id_auto_cliente)
            );

            // Eliminar vehículos que ya no están en la lista
            const vehiculosAEliminar = vehiculosActuales.filter(
                vehiculo => !idsVehiculosEnviados.has(vehiculo.id)
            );

            if (vehiculosAEliminar.length > 0) {
                await Promise.all(
                    vehiculosAEliminar.map(async (vehiculo) => {
                        return await AutoCliente.destroy({ where: { id: vehiculo.id } });
                    })
                );
            }

            // Actualizar o crear vehículos
            const autosCreados = await Promise.all(
                vehiculos.map(async (vehiculo) => {
                    if (vehiculo.id_auto_cliente) {
                        // Verificar si el vehiculo ya existe y pertenece al cliente
                        const existingVehicle = await vehicleService.getClientVehicleById(vehiculo.id_auto_cliente, id);

                        if (existingVehicle) { // Si existe, actualiza los datos
                            return await AutoCliente.update({
                                id_auto: vehiculo.modelo,
                                patente: vehiculo.patente,
                                n_chasis: vehiculo.chasis,
                            }, { where: { id: vehiculo.id_auto_cliente } });
                        }
                    } else { // Si no existe, lo crea
                        return await AutoCliente.create({
                            id_auto: vehiculo.modelo,
                            id_cliente: id,
                            patente: vehiculo.patente,
                            n_chasis: vehiculo.chasis,
                            color: null,
                        });
                    }
                })
            );

            res.status(200).json({ status: 'success', message: 'Cliente actualizado con éxito', data: { cliente: cliente, vehiculos: autosCreados }, alertType: 'success' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor', alertType: 'error' });
    }
}

/**
 * Obtiene un cliente por su ID.
 * @returns {Object} Cliente encontrado.
 **/
const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        let cliente = await clientService.getClienteById(id);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        console.log(
            'Cliente:', cliente.toJSON()
        );

        // Transformar los autos al formato que necesita el frontend
        const vehiculosFormateados = cliente.autos.map((auto, index) => {
            console.log('Auto:', auto.toJSON());

            return {
                id_auto_cliente: auto.id,
                id_auto: auto.id_auto,
                marca: auto.detalle.marca.toString(),
                modelo: auto.detalle.id.toString(),
                patente: auto.patente || '',
                chasis: auto.n_chasis || '',
                modelosOptions: [],
                placeholderModelos: 'Primero seleccione una marca'
            };
        });

        // Crear un objeto limpio con solo los datos necesarios
        const clienteFormateado = {
            id: cliente.id,
            nombre: cliente.nombre,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            correo: cliente.correo,
            creador: `${cliente.creador.name} ${cliente.creador.lastname}`,
            vehiculos: vehiculosFormateados
        };

        res.status(200).json({ status: 'success', cliente: clienteFormateado });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

/**
 * Devuelve la lista de todos los clientes.
 * @returns {Object} Lista de clientes.
 * */
const listClients = async ({res, req, next}) => {
    try {
        const clientes = await clientService.getAllClientes();
        res.status(200).json({ status: 'success', clientes: clientes });
    } catch (error) {
        next(error);
    }
}

/**
 * Obtiene los clientes asignados a un mecánico.
 * @returns {Object} Lista de clientes del mecánico.
 * */
const listMechanicClients = async (req, res, next) => {
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

export { registerClient, updateClient, listClients, listMechanicClients, getClientById };