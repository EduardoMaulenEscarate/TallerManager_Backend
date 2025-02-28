import Cliente from "../models/cliente.model.mjs";
import Auto from "../models/auto.model.mjs";
import Orden from "../models/orden.model.mjs";
import AutoCliente from "../models/autoCliente.model.mjs";
import User from "../models/user.model.mjs";
import { Op } from "sequelize";

async function getClienteById(id) {
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

const getClientByPhoneOrMail = async (phone, mail) => {
    return await Cliente.findOne({
        where: {
            [Op.or]: [{ telefono: phone }, { correo: mail }]
        }
    });
};

const getClientByMail = async (mail) => {
    return await Cliente.findOne({
        where: {
            correo: mail
        }
    });
}

const getClientByPhone = async (phone) => {
    return await Cliente.findOne({
        where: {
            telefono: phone
        }
    });
}
export default { getClienteById, getClientByPhoneOrMail, getClientByMail, getClientByPhone };