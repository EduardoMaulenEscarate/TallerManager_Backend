import Repuesto from '../models/repuesto.model.mjs';
import Servicio from '../models/servicio.model.mjs';
async function getAllRepuestos() {
    return await Repuesto.findAll();
}

async function getAllServicios() {
    return await Servicio.findAll();
}

export default { getAllRepuestos, getAllServicios };