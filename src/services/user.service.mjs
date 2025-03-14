import User from '../models/user.model.mjs';

/**
 * @fileoverview Servicios para el modulo de usuarios.
 */

/**
 * Obtiene un usuario por su id.
 * @param {Number} id Id del usuario.
 * @returns {Object} Usuario. 
 */
const getUserById = async (id) => {
    return await User.findByPk(id, { attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

/**
 * Obtiene un usuario por su correo.
 * @param {String} email Correo del usuario.
 * @returns {Object} Usuario. 
 */
const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email }, attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

/**
 * Obtiene un usuario por su correo y nombre de usuario.
 * @param {String} email Correo del usuario.
 * @param {String} username Nombre de usuario.
 * @returns {Object} Usuario. 
 */
const getUserByEmailUsername = async (email, username) => {
    return await User.findOne({ where: { email, username }, attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

/**
 * Obtiene la lista de usuarios.
 * @returns {Object} Lista de usuarios.
 * */
const getAllUsers = async () => {
    return await User.findAll({ attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

/**
 * Actualiza un usuario.
 * @param {Object} data Datos del usuario.
 * @param {Number} data.id Id del usuario.
 * @param {String} data.username Nombre de usuario.
 * @param {String} data.firstName Nombre del usuario.
 * @param {String} data.lastName Apellido del usuario.
 * @param {Number} data.permission Tipo de usuario.
 * @param {String} data.phone Teléfono del usuario.
 * @param {String} data.email Correo del usuario.
 * @param {String} data.address Dirección
 * @returns {Object} Usuario actualizado.
 * */
const updateUser = async ({ id, username, firstName, lastName, permission, phone, email, address }) => {
    const user = await User.findByPk(id);

    if (!user) {
        return false;
    }

    const usernameNormalized = username.trim().toLowerCase();
    const emailNormalized = email.trim().toLowerCase();

    user.username = usernameNormalized;
    user.name = firstName;
    user.lastname = lastName;
    user.type = permission;
    user.phone = phone;
    user.email = emailNormalized;
    user.address = address;

    return await user.save();
}
export default { getUserById, getUserByEmail, getAllUsers, getUserByEmailUsername, updateUser };
