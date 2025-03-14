import User from "../models/user.model.mjs";
import { validateUserRegister } from "../validators/user.validator.mjs";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import userService from '../services/user.service.mjs';

/**
 * @fileoverview Gestiona las operaciones relacionadas con los usuarios.
 */

/**
 * Registra un usuario si los datos son válidos.
 * @returns {Object} Usuario registrado.
 * */
const registerUser = async (req, res) => {
    try {
        const { username, firstName, lastName, permission, phone, email, address } = req.body;
        const logedUser = req.user;

        // valida los datos
        const result = await validateUserRegister(req.body);

        if (!result.isValid) {
            return res.status(200).json({ status: 'error', message: result.msg, alertType: 'error' });
        }

        // Si los datos son válidos, registra el usuario
        const usernameNormalizado = username.trim().toLowerCase();
        const emailNormalizado = email.trim().toLowerCase();

        //valida que el usuario no exista
        if (await userService.getUserByEmailUsername(emailNormalizado, usernameNormalizado)) {
            return res.status(200).json({ status: 'error', message: 'El correo o nombre de usuario ya está registrado', alertType: 'error' });
        }

        //crea la contraseña automaticamente usando los primeros 4 caracteres del nombre y los primeros 4 del apellido ademas de 2 numeros aleatorios
        const password = firstName.substring(0, 4).toLowerCase() + '_' + lastName.substring(0, 4).toLowerCase() + Math.floor(Math.random() * 100);
        //hash de la contraseña
        console.log(password);//solo para desarrollo

        const hashedPassword = await hash(password, 10);

        const user = await User.create({ username: usernameNormalizado, name: firstName, lastname: lastName, type: permission, phone, password: hashedPassword, email: emailNormalizado, address, created_by: logedUser.name + ' ' + logedUser.lastname });

        return res.status(201).json({ status: 'success', message: 'Usuario registrado  con éxito', registedUser: user, alertType: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error, alertType: 'error' });
    }
}

/**
 * Obtiene la lista de usuarios.
 * @returns {Object} Lista de usuarios.
 * */
const listUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ status: 'success', usuarios: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

/**
 * Obtiene un usuario por su id.
 * @returns {Object} Usuario.
 * */
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json({ status: 'success', user: user });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

/**
 * Actualiza un usuario.
 * @returns {Object} Usuario actualizado.
 * */
const updateUser = async (req, res) => {
    const { id, username, firstName, lastName, permission, phone, email, address } = req.body;
    const logedUser = req.user;

    // valida los datos
    const result = await validateUserRegister(req.body);

    if (!result.isValid) {
        return res.status(200).json({ status: 'error', message: result.msg, alertType: 'error' });
    }

    // Si los datos son válidos, actualiza el usuario
    const updateUser = await userService.updateUser({ id, username, firstName, lastName, permission, phone, email, address });

    if (!updateUser) {
        return res.status(200).json({ status: 'error', message: 'Usuario no encontrado', alertType: 'error' });
    } else {
        res.status(200).json({ status: 'success', message: 'Usuario actualizado con éxito', updatedUser: updateUser, alertType: 'success' });
    }

}

export { registerUser, listUsers, getUserById, updateUser };