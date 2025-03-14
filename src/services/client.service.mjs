import Cliente from "../models/cliente.model.mjs";
import Auto from "../models/auto.model.mjs";
import Orden from "../models/orden.model.mjs";
import AutoCliente from "../models/autoCliente.model.mjs";
import User from "../models/user.model.mjs";
import Marca from "../models/marca.model.mjs";
import { Op } from "sequelize";

/**
 * @fileoverview Servicios para el modulo de clientes.
 */

/**
 * Obtiene la lista de clientes.
 * @returns {Object} Lista de clientes.
 * */
const getAllClientes = async () => {
    return await Cliente.findAll({
        include: [
            { model: User, as: 'creador', attributes: ['name', 'lastname'] },
            {
                model: AutoCliente, as: 'autos'
                , include: [
                    {
                        model: Auto, as: 'detalle',
                        include: [
                            { model: Marca, as: 'marca_auto' }
                        ]
                    },
                    { model: Orden, as: 'ordenes' },
                ]
            }
        ]
    });
}

/**
 * Obtiene un cliente por su id.
 * @param {Number} id Id del cliente.
 * @returns {Object} Cliente.
 * */
const getClienteById = async (id) => {
    return await Cliente.findByPk(id, {
        include: [
            {
                model: User,
                as: 'creador',
                attributes: ['name', 'lastname']
            },
            {
                model: AutoCliente,
                as: 'autos',
                include: [{
                    model: Auto,
                    as: 'detalle'
                }, {
                    model: Orden,
                    as: 'ordenes'
                }]
            }
        ]
    });
}

/**
 * Obtiene un cliente por su número de teléfono o correo.
 * @param {String} phone Teléfono del cliente.
 * @param {String} mail Correo del cliente.
 * @returns {Object} Cliente.
 * */
const getClientByPhoneOrMail = async (phone, mail) => {
    return await Cliente.findOne({
        where: {
            [Op.or]: [{ telefono: phone }, { correo: mail }]
        }
    });
};

/**
 * Obtiene un cliente por su correo.
 * @param {String} mail Correo del cliente.
 * @returns {Object} Cliente.
 * */
const getClientByMail = async (mail) => {
    return await Cliente.findOne({
        where: {
            correo: mail,
            correo: {
                [Op.not]: null
            }
        }
    });
}

/**
 * Obtiene un cliente por su número de teléfono.
 * @param {String} phone Teléfono del cliente.
 * @returns {Object} Cliente.
 * */
const getClientByPhone = async (phone) => {
    return await Cliente.findOne({
        where: {
            telefono: phone
        }
    });
}
export default { getAllClientes, getClienteById, getClientByPhoneOrMail, getClientByMail, getClientByPhone };