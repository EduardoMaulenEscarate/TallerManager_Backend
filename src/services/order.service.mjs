import Orden from "../models/orden.model.mjs";
import OrdenServicio from "../models/ordenServicio.model.mjs";
import RepuestoOrden from "../models/repuestoOrden.model.mjs";
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
const registerOrder = async ({ vehicle, kilometraje, estimatedDelivery, priority}, idUser) => {
    console.log("Está eb servicio" );  ;
    console.log(vehicle, kilometraje, estimatedDelivery, priority);
}

/**
 * Registra los repuestos de la orden en la base de datos
 * @param {Object} sparePartsData Datos de los repuestos a registrar
 * @param {Number} sparePartsData.id_orden Id de la orden
 * @param {Number} sparePartsData.sparePart Id del repuesto
 * @param {Number} sparePartsData.quantity Cantidad de repuestos
 * @param {Number} sparePartsData.price Precio del repuesto
 * */
const registerOrderSpareParts = async(sparePartData) => {

}

/**
 * Registra los servicios de la orden en la base de datos
 * @param {Object} serviceData Datos del servicio a registrar
 * @param {Number} serviceData.id_orden Id de la orden
 * @param {Number} serviceData.service Id del servicio
 * @param {Number} serviceData.price Precio del servicio
 */
const registerOrderService = async(serviceData) => {

}

export default { registerOrder, registerOrderSpareParts, registerOrderService };
