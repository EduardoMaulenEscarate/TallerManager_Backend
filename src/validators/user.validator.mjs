import * as val from './global.validator.mjs';
import User from '../models/user.model.mjs';
import { Op } from 'sequelize';

// valida los datos que recibe 
const validateUserRegister = async ({ username, firstName, lastName, permission, phone, email, address }) => {
    // Lista de validaciones
    const validations = [
        { value: username, method: val.emptyField, args: ['Nombre de usuario'], optional: false },
        { value: username, method: val.stringLength, args: [3, 45, 'Nombre de usuario'], optional: false },
        { value: firstName, method: val.emptyField, args: ['Nombre'], optional: false },
        { value: firstName, method: val.stringLength, args: [3, 45, 'Nombre'], optional: false },
        { value: lastName, method: val.emptyField, args: ['Apellido'], optional: false },
        { value: lastName, method: val.stringLength, args: [3, 45, 'Apellido'], optional: false },
        { value: permission, method: val.emptyField, args: ['Permiso'], optional: false },
        { value: permission, method: val.isNumber, args: ['Permiso'], optional: false },
        { value: phone, method: val.emptyField, args: ['Teléfono'], optional: false },
        { value: phone, method: val.stringLength, args: [9, 12, 'Teléfono'], optional: false },
        { value: email, method: val.emptyField, args: ['Correo'], optional: false },
        { value: email, method: val.stringLength, args: [3, 45, 'Correo'], optional: false },
        { value: email, method: val.validateMailFormat, args: [], optional: false },
        { value: address, method: val.emptyField, args: ['Dirección'], optional: true },
        { value: address, method: val.stringLength, args: [3, 45, 'Dirección'], optional: true }
    ];

    const result = val.executeValidations(validations);

    return result;
}

export { validateUserRegister };