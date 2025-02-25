import User from "../models/user.model.mjs";
import { validateUserRegister } from "../validators/user.validator.mjs";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;

// Registrar un mecanico
async function registerUser(req, res) {
    try {
        const { username, firstName, lastName, permission, phone, email, address } = req.body;
        const logedUser = req.user;

        console.log(req.body);

        // valida los datos
        const result = await validateUserRegister(req.body);

        if (!result.isValid) {
            return res.status(200).json({ status: 'error', message: result.msg, alertType: 'error' });
        }

        // Si los datos son válidos, registra el usuario
        const usernameNormalizado = username.trim().toLowerCase();
        const emailNormalizado = email.trim().toLowerCase();

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

export { registerUser };