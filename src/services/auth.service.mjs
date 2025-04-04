import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt; // Desestructura las funciones que necesitas
import jwt from 'jsonwebtoken';
const { sign } = jwt; // Desestructuramos la función sign
import User from '../models/user.model.mjs';
import { JWT } from '../config/config.mjs';

/**
 * @fileoverview Servicios para el modulo de usuarios.
 */

/**
 * Hashea la contraña y registra un usuario en la base de datos.
 * @param {String} username Nombre de usuario (sistema).
 * @param {String} name Nombre del usuario.
 * @param {String} lastname Apellido del usuario.
 * @param {String} email Correo del usuario.
 * @param {String} password Contraseña del usuario.
 * @returns {Object} Usuario registrado.
 */
async function registerUser(username, name, lastname, email, password) {
    const hashedPassword = await hash(password, 10);
    const user = await User.create({ username, type: 1, email, password: hashedPassword, name, lastname });

    return user;
}

/**
 * Inicia sesión.
 * @param {String} email Correo del usuario.
 * @param {String} password Contraseña del usuario.
 * @returns {Object} Usuario y token.
 */
async function loginUser(email, password) {
    try {
        const user = await User.findOne({ where: { email }, include: 'tipoUsuario' });
        if (!user) return { isValid: false, error: "Usuario no encontrado" };

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) return { isValid: false, error: "Contraseña incorrecta" };

        const token = sign({ id: user.id, username: user.username, email: user.email, name: user.name, lastname: user.lastname, id_type: user.type, type: user.tipoUsuario.tipo  }, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN });

        return { isValid: true, user, token };

    } catch (error) {
        return { isValid: false, error: "Error al iniciar sesión" };
    }
}

/**
 * Cierra la sesión eliminando la cookie.
 */
const logoutUser = async (req, res) => {
    // Eliminar la cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // cambiar en producción
        samesite: 'Strict'
    })
};

export { registerUser, loginUser, logoutUser };
