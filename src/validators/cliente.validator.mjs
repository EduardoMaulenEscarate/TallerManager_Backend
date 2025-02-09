import * as val from '../validators/global.validator.mjs';
import Cliente from '../models/cliente.model.mjs';

export const validateRegisterCliente = async ({ nombre, telefono, direccion, correo }) => {
    // Lista de validaciones
    const validations = [
        { value: nombre, method: val.emptyField, args: ['Nombre'] },
        { value: nombre, method: val.stringLength, args: [3, 45, 'Nombre'] },
        { value: telefono, method: val.emptyField, args: ['Teléfono'] },
        { value: telefono, method: val.stringLength, args: [9, 12, 'Teléfono'], optional: false },
        { value: direccion, method: val.stringLength, args: [3, 45, 'Dirección'], optional: false },
        { value: correo, method: val.emptyField, args: ['Correo'] },
        { value: correo, method: val.stringLength, args: [3, 45, 'Correo'] },
        { value: correo, method: val.validateMailFormat, args: [] }
    ];

    const result = val.executeValidations(validations);
    if (!result.isValid) return result;

    try {
        // Normaliza correo antes de buscar
        const correoNormalizado = correo.trim().toLowerCase();

        // Verifica si el correo ya existe
        const clienteExistente = await Cliente.findOne({ where: { correo: correoNormalizado } });

        if (clienteExistente) return { isValid: false, msg: 'El correo ya está registrado' };

        return { isValid: true };
    } catch (error) {
        console.error('Error en validación:', error);
        return { isValid: false, msg: 'Error interno en la validación del cliente' };
    }
};