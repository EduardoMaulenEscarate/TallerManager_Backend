import Repuesto from '../models/repuesto.model.mjs';
import Servicio from '../models/servicio.model.mjs';

/**
 * @fileoverview Servicios para el modulo de campos de los formularios.
 */

/**
 * Obtiene la lista de repuestos.
 * @returns {Object} Lista de repuestos.
 * */
const getAllRepuestos = async () => {
    return await Repuesto.findAll();
}

/**
 * Obtiene la lista de servicios.
 * @returns {Object} Lista de servicios.
 * */
const getAllServicios = async () => {
    return await Servicio.findAll();
}

export default { getAllRepuestos, getAllServicios };