import User from '../models/user.model.mjs';

async function getUserById(id) {
    return await User.findByPk(id, { attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

async function getUserByEmail(email) {
    return await User.findOne({ where: { email }, attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

async function getAllUsers() {
    return await User.findAll({ attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

export default { getUserById, getUserByEmail, getAllUsers };
