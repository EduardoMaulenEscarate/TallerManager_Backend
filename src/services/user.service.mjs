import User from '../models/user.model.mjs';

async function getUserById(id) {
    return await User.findByPk(id, { attributes: { exclude: ['password'] } });
}

export default { getUserById };
