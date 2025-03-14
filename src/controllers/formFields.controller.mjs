import formFieldsService from '../services/formFields.service.mjs';
import clientService from '../services/client.service.mjs';

/**
 * @fileoverview Este módulo gestiona las solicitudes de campos de los formularios. 
 */

/**
 * Obtiene la lista de repuestos.
 * @returns {Object} Respuesta de la solicitud.
 * */
const repuestos = async (req, res) => {
    try {
        const repuestos = await formFieldsService.getAllRepuestos();
        // Reordena el arreglo para que quede en el formato que requiere el formulario
        const updatedRepuestos = repuestos.map((repuesto) => ({ value: repuesto.id,  label: repuesto.nombre }));

        res.status(200).json({ status: 'success', campos: updatedRepuestos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

/**
 * Obtiene la lista de servicios.
 * @returns {Object} Respuesta de la solicitud.
 * */
const servicios = async (req, res) => {
    try {
        const servicios = await formFieldsService.getAllServicios();
        // Reordena el arreglo para que quede en el formato que requiere el formulario
        const updatedServicios = servicios.map((servicio) => ({ value: servicio.id,  label: servicio.nombre }));
            
        res.status(200).json({ status: 'success', campos: updatedServicios });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

/**
 * Obtiene la lista de clientes.
 * @returns {Object} Respuesta de la solicitud.
 * */
const clientes = async (req, res) => {
    try {
        const clientes = await clientService.getAllClientes();
        res.status(200).json({ status: 'success', campos: clientes });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

export { repuestos, servicios, clientes };