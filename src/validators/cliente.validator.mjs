import * as val from '../validators/global.validator.mjs';
import Cliente from '../models/cliente.model.mjs';

export const validateRegisterCliente = async ({ nombre, telefono, direccion, correo, vehiculos }) => {

    console.log('Validando cliente:', { nombre, telefono, direccion, correo, vehiculos });

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

    let result = val.executeValidations(validations);

    //valida los campos de vehículos
    for (const { id, marca, modelo, patente, chasis } of vehiculos) {
        let vehicleValidations = [
            { value: marca, method: val.emptyField, args: [`Marca de Vehículo ${id + 1}`] },
            { value: modelo, method: val.emptyField, args: [`Modelo de Vehículo ${id + 1}`] },
            { value: patente, method: val.emptyField, args: [`Patente de Vehículo ${id + 1}`] },
            { value: patente, method: val.stringLength, args: [6, 8, `Patente de Vehículo ${id + 1}`] },
            { value: chasis, method: val.emptyField, args: [`Numero de chasis de Vehículo ${id + 1}`], optional: true },
            { value: chasis, method: val.stringLength, args: [10, 12, `Numero de chasis de Vehículo ${id + 1}`], optional: true },
        ]

        result = val.executeValidations(vehicleValidations);

        if (!result.isValid) { break; }
    }

    return result;
    /* try {
        // Normaliza correo antes de buscar
        const correoNormalizado = correo.trim().toLowerCase();

        // Verifica si el correo ya existe
        const clienteExistente = await Cliente.findOne({ where: { correo: correoNormalizado } });

        if (clienteExistente) return { isValid: false, msg: 'Ya existe un cliente con ese correo' };

        return { isValid: true };
    } catch (error) {
        console.error('Error en validación formulario cliente:', error);
        return { isValid: false, msg: 'Error interno en la validación del cliente' };
    } */
};