import Orden from "../models/orden.model.mjs";
import OrdenServicio from "../models/ordenServicio.model.mjs";
import OrdenRepuesto from "../models/ordenRepuesto.model.mjs";
import OrdenFoto from "../models/ordenFoto.model.mjs";
import Observacion from "../models/ordenObservacion.model.mjs";
import { Op } from "sequelize";

/**
 * @fileoverview Servicios para el modulo de ordenes
 *   */

/**
 * Registra al orden en la base de datos
 * @param {Object} orderData Datos del orden a registrar
 * @param {Number} orderData.vehicle Id del vehiculo
 * @param {Number} orderData.kilometraje Kilometraje del vehiculo
 * @param {Date} orderData.estimatedDelivery Fecha estimada de entrega
 * @param {Number} orderData.priority Prioridad de la orden
 * @param {Number} idUser Id del usuario que registra la orden
 * */
const registerOrder = async ({ vehicle, kilometraje, admissionReason, diagnosis,  estimatedDelivery, priority, state}, idUser) => {
    return await Orden.create({
        creado_por: idUser,
        id_auto_cliente: vehicle,
        numero_orden: 0,
        kilometraje,
        fecha_ingreso: new Date(),
        motivo_ingreso: admissionReason,
        diagnostico: diagnosis,
        fecha_entrega_estimada: estimatedDelivery,
        id_prioridad: priority,
        id_estado: state
    });
}

/**
 * Registra los repuestos de la orden en la base de datos
 * @param {Object} sparePartsData Datos de los repuestos a registrar
 * @param {Number} sparePartsData.id_orden Id de la orden
 * @param {Number} sparePartsData.sparePart Id del repuesto
 * @param {Number} sparePartsData.quantity Cantidad de repuestos
 * @param {Number} sparePartsData.price Precio del repuesto
 * */
const registerOrderSpareParts = async(sparePartData, id_orden) => {
    return await OrdenRepuesto.create({
        id_order: id_orden,
        id_repuesto: sparePartData.id_sparePart,
        cantidad: sparePartData.quantity,
        precio_unitario: sparePartData.price
    })
}

/**
 * Registra los servicios de la orden en la base de datos
 * @param {Object} serviceData Datos del servicio a registrar
 * @param {Number} serviceData.id_orden Id de la orden
 * @param {Number} serviceData.service Id del servicio
 * @param {Number} serviceData.price Precio del servicio
 */
const registerOrderService = async(serviceData, id_orden) => {
    return await OrdenServicio.create({
        id_orden: id_orden,
        id_servicio: serviceData.id_service,
        precio: serviceData.price
    });
}


/**
 * Registra una observación para una orden específica.
 *
 * @async
 * @function registerOrderObservation
 * @param {string} observation - El texto de la observación a asociar con la orden.
 * @param {number} id_orden - El identificador de la orden.
 */
const registerOrderObservation = async (observations, id_orden) => {
    return await Observacion.create({
        id_orden: id_orden,
        observacion: observations
    });
}

/**
 * Registra una foto asociada a una orden.
 *
 * @param {Object} photo - El objeto de la foto a asociar con la orden.
 * @param {number} id_orden - El identificador de la orden.
 */
const registerOrderPhoto = async (photo, id_orden) => {
    return await OrdenFoto.create({
        id_orden: id_orden,
        url: photo.path
    });
}

/**
 * Obtiene todas las ordenes de la base de datos
 * @returns {Array} Lista de ordenes
 * */
const getAllOrders = async () => {
    return await Orden.findAll({
        include: [
            { model: OrdenServicio, as: 'servicios' },
            { model: OrdenRepuesto, as: 'repuestos' },
            { model: Observacion, as: 'observaciones' },
            { model: OrdenFoto, as: 'fotos' },
            
        ]
    });
}

export default { registerOrder, registerOrderSpareParts, registerOrderService, registerOrderObservation, registerOrderPhoto, getAllOrders };
