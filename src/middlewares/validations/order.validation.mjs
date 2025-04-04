import * as val from '../../validators/global.validator.mjs';

/**
 * @fileoverview Middleware de validaciones para el modulo de ordenes.
*/

/**
 * Valida los datos de registro de una orden.
 * @param {Object} req.body Datos de la orden a registrar.
 * @param {number} req.body.vehicle Id del vehiculo.
 * @param {number} req.body.priority Prioridad de la orden.
 * @param {number} req.body.kilometraje Kilometraje del vehiculo.
 * @param {string} req.body.estimatedDelivery Fecha estimada de entrega.
 * @param {Array} req.body.spareParts Lista de repuestos.
 * @param {Array} req.body.spareParts_prices Lista de precios de los repuestos.
 * @param {Array} req.body.quantitys Lista de cantidades de los repuestos.
 * @param {Array} req.body.services Lista de servicios.
 * @param {Array} req.body.services_prices Lista de precios de los servicios.
 * @param {number} req.body.state Estado de la orden.
 * @param {string} req.body.observations Observaciones de la orden.
 * @returns {Object} Respuesta con el resultado de la validacion.
 *  * */
const validateOrderForm = async (req, res, next) => {
    const { vehicle, priority, kilometraje, 
            estimatedDelivery,
            admissionReason, diagnosis, 
            spareParts, spareParts_prices, quantitys, 
            services, services_prices, state, observations} = req.body; 

            console.log(
                'vehicle:', vehicle, 
                'priority:', priority, 
                'kilometraje:', kilometraje, 
                'estimatedDelivery:', estimatedDelivery,
                'admissionReason:', admissionReason, 
                'diagnosis:', diagnosis, 
                'spareParts:', spareParts, 
                'spareParts_prices:', spareParts_prices, 
                'quantitys:', quantitys, 
                'services:', services, 
                'services_prices:', services_prices, 
                'state:', state, 
                'observations:', observations
            );
            
    const validations = [
        { value: vehicle, method: val.emptyField, args: ['Vehículo'], optional: false },
        { value: vehicle, method: val.isNumber, args: ['Vehículo'], optional: false },
        { value: priority, method: val.emptyField, args: ['Prioridad'], optional: false },
        { value: priority, method: val.isNumber, args: ['Prioridad'], optional: false },
        { value: kilometraje, method: val.emptyField, args: ['Kilometraje'], optional: true },
        { value: kilometraje, method: val.isNumber, args: ['Kilometraje'], optional: true },
        { value: admissionReason, method: val.emptyField, args: ['Motivo de ingreso'], optional: true },
        { value: admissionReason, method: val.stringLength, args: [10, 400, 'Motivo de ingreso'], optional: true },
        { value: diagnosis, method: val.emptyField, args: ['Diagnóstico'], optional: true },
        { value: diagnosis, method: val.stringLength, args: [10, 400, 'Diagnóstico'], optional: true },
        { value: estimatedDelivery, method: val.emptyField, args: ['Fecha de entrega estimada'], optional: false },
        { value: state, method: val.emptyField, args: ['Estado'], optional: false },
        { value: state, method: val.isNumber, args: ['Estado'], optional: false },
        { value: observations, method: val.emptyField, args: ['Observaciones'], optional: true },
        { value: observations, method: val.stringLength, args: [3, 45, 'Observaciones'], optional: true },
    ] 

    spareParts.forEach((sparePart, index) => {
        validations.push(
            { value: sparePart, method: val.emptyField, args: [`Repuesto ${index+1}`], optional: false },
            { value: quantitys[index], method: val.emptyField, args: [`Cantidad de repuesto ${index+1}`], optional: false },
            { value: quantitys[index], method: val.isNumber, args: [`Cantidad de repuesto ${index+1}`], optional: false },
            { value: spareParts_prices[index], method: val.emptyField, args: [`Precio del repuesto ${index+1}`], optional: false },
            { value: spareParts_prices[index], method: val.isNumber, args: [`Precio del repuesto ${index+1}`], optional: false }
        );
    });

    validations.push(
        { value: services, method: val.arrayLength, args: [1, 'Servicios'], optional: false },
    );

    services.forEach((service, index) => {
        validations.push(
            { value: service, method: val.emptyField, args: [`Servicio ${index+1}`], optional: false },
            { value: services_prices[index], method: val.emptyField, args: [`Precio del servicio ${index+1}`], optional: false },
            { value: services_prices[index], method: val.isNumber, args: [`Precio del servicio ${index+1}`], optional: false }
        );
    });

    const result = val.executeValidations(validations);

    if (!result.isValid) { return res.status(400).json({ message: result.msg }); }
    
    next();
}

export { validateOrderForm };