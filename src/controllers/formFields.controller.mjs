import formFieldsService from '../services/formFields.service.mjs';
import clientService from '../services/client.service.mjs';

async function repuestos(req, res) {
    try {
        const repuestos = await formFieldsService.getAllRepuestos();
        // Reordena el arreglo para que quede en el formato que requiere el formulario
        const updatedRepuestos = repuestos.map((repuesto) => {
            return {
                value: repuesto.id,
                label: repuesto.nombre,
            };
        });
       
        res.status(200).json({ status: 'success', campos: updatedRepuestos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

async function servicios(req, res) {
    try {
        const servicios = await formFieldsService.getAllServicios();
        // Reordena el arreglo para que quede en el formato que requiere el formulario
        const updatedServicios = servicios.map((servicio) => {
            return {
                value: servicio.id,
                label: servicio.nombre,
            };
        });

        res.status(200).json({ status: 'success', campos: updatedServicios });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}

async function clientes(req, res) {
    try {
        const clientes = await clientService.getAllClientes();
        res.status(200).json({ status: 'success', campos: clientes });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno en el servidor: ' + error });
    }
}
export { repuestos, servicios, clientes };