import AutoCliente from "../models/autoCliente.model.mjs";
import Auto from "../models/auto.model.mjs";
import Marca from "../models/marca.model.mjs";

/** 
 * @fileoverview Servicios para el modulo de vehículos.
 */

/**
 * Obtiene un vehículo de un cliente por su id.
 * @param {Number} id_auto_cliente Id del vehículo del cliente.
 * @param {Number} id_cliente Id del cliente.
 * @returns {Object} Vehículo del cliente.
 * */
const getClientVehicleById = async (id_auto_cliente, id_cliente) => {
    return await AutoCliente.findOne({
        where: {
            id: id_auto_cliente,
            id_cliente: id_cliente
        },
        include: [
            {
                model: Auto,
                as: 'detalle',
                include: [
                    { model: Marca, as: 'marca_auto' }
                ]
            }
        ]
    });
}

/**
 * Obtiene la lista de vehículos de un cliente.
 * @param {Number} id_client Id del cliente.
 * @returns {Object} Lista de vehículos del cliente.
 * */
const getClientVehicles = async (id_client) => {
    return await AutoCliente.findAll({
        where: {
            id_cliente: id_client
        },
        include: [
            {
                model: Auto,
                as: 'detalle',
                include: [
                    { model: Marca, as: 'marca_auto' }
                ]
            }
        ]
    });
}

export default { getClientVehicleById, getClientVehicles };

