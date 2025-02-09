import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt; // Desestructura las funciones que necesitas
import jwt from 'jsonwebtoken';
const { sign } = jwt; // Desestructuramos la función sign

import User from '../models/user.model.mjs';
import { JWT } from '../config/config.mjs';

// Registrar un usuario
async function registerUser(username, name, lastname, email, password) {
    const hashedPassword = await hash(password, 10);
    const user = await User.create({ username, type: 1, email, password: hashedPassword, name, lastname });

    return user;
}

// Iniciar sesión
async function loginUser(email, password) {
    try {
        const user = await User.findOne({ where: { email }, include: 'tipoUsuario' });
        if (!user) return { isValid: false, error: "Usuario no encontrado" };

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) return { isValid: false, error: "Contraseña incorrecta" };

        const token = sign({ id: user.id, username: user.username, email: user.email, name: user.name, lastname: user.lastname }, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN });

        return { isValid: true, user, token };

    } catch (error) {
        return { isValid: false, error: "Error al iniciar sesión" };
    }
}

// Cerrar sesión
const logoutUser = async (req, res) => {
    // Eliminar la cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // cambiar en producción
        samesite: 'Strict'
    })
};
export { registerUser, loginUser, logoutUser };
