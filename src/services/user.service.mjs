import User from '../models/user.model.mjs';

async function getUserById(id) {
    return await User.findByPk(id, { attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

async function getUserByEmail(email) {
    return await User.findOne({ where: { email }, attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

async function getUserByEmailUsername(email, username) {
    return await User.findOne({ where: { email, username }, attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

async function getAllUsers() {
    return await User.findAll({ attributes: { exclude: ['password'] }, include: 'tipoUsuario' });
}

async function updateUser({ id, username, firstName, lastName, permission, phone, email, address }) {
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
