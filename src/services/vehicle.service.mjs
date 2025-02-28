import AutoCliente from "../models/autoCliente.model.mjs";
import Auto from "../models/auto.model.mjs";
import Marca from "../models/marca.model.mjs";

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

