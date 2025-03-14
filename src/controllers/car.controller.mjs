import Marca from "../models/marca.model.mjs";
import User from "../models/user.model.mjs";
import Auto from "../models/auto.model.mjs";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;

/**
 * @fileoverview Gestiona las operaciones relacionadas con los autos.
 */

/**
 * Obtiene la lista de marcas.
 * @returns {Object} Lista de marcas.
 * */
const listarMarcas = async (req, res) => {
    try {
        const marcas = await Marca.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, order: ['nombre'] }); // Espera el resultado de la consulta
        return res.status(200).json({ status: "success", data: marcas });
    } catch (error) {
        console.error('Error al obtener marcas:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

/**
 * Obtiene la lista de autos.
 * @returns {Object} Lista de autos.
 * */
const listarModelos = async (req, res) => {
    try {
        const autos = await Auto.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Marca,
                as: 'marca_auto',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        }); // Espera el resultado de la consulta
        return res.status(200).json({ status: "success", data: autos });
    } catch (error) {
        console.log('error' + error);

    }
}

//ruta de desarrollo solamente
const crearUsuario = async (req, res) => {
    const password = 'clavePulenta@1';
    const hashedPassword = await hash(password, 10);

    await User.create({
        username: 'admin',
        name: 'Administrador',
        lastname: 'del Sistema',
        type: 1,
        phone: '1234567890',
        password: hashedPassword,
        email: 'kiki@correo.com',
        address: 'Calle falsa 123',
        created_by: 'Sistema'
    });

    return res.status(200).json({ status: "success", msg: "Usuario creado con éxito" });

};
export { listarMarcas, listarModelos, crearUsuario };