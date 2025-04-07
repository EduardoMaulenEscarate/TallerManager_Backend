import Orden from "../models/orden.model.mjs";
import OrdenServicio from "../models/ordenServicio.model.mjs";
import OrdenRepuesto from "../models/ordenRepuesto.model.mjs";
import OrdenFoto from "../models/ordenFoto.model.mjs";
import Observacion from "../models/ordenObservacion.model.mjs";
import AutoCliente from "../models/autoCliente.model.mjs";
import Cliente from "../models/cliente.model.mjs";
import Repuesto from "../models/repuesto.model.mjs";
import Auto from "../models/auto.model.mjs";
import Marca from "../models/marca.model.mjs";
import { Op } from "sequelize";
import Servicio from "../models/servicio.model.mjs";
import Prioridad from "../models/prioridad.model.mjs";
import EstadoOrden from "../models/estadoOrden.model.mjs";
import fs from 'fs';
import path from 'path';

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
const registerOrder = async ({ vehicle, kilometraje, admissionReason, diagnosis, estimatedDelivery, priority, state }, idUser) => {
    return Orden.create({
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
const registerOrderSpareParts = async (sparePartData, id_orden) => {
    return OrdenRepuesto.create({
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
const registerOrderService = async (serviceData, id_orden) => {
    return OrdenServicio.create({
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
    return Observacion.create({
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
    return OrdenFoto.create({
        id_orden: id_orden,
        url: photo.filename
    });
}

/**
 * Obtiene todas las ordenes de la base de datos
 * @returns {Array} Lista de ordenes
 * @param {Object} user - El usuario autenticado.
 * */
const getAllOrders = async (user) => {
    try {
        // Si el usuarios es un administrador, se obtienen todas las ordenes
        if (user.type == 'Administrador' || user.id_type == '1') {
            return Orden.findAll({
                include: [
                    {
                        model: AutoCliente, as: 'autoCliente',
                        include: [
                            { model: Cliente, as: 'cliente' },
                            { model: Auto, as: 'detalle', include: [{ model: Marca, as: 'marca_auto' }] }
                        ]
                    },
                    {
                        model: OrdenServicio, as: 'servicios',
                        include: [{ model: Servicio, as: 'servicio' }]
                    },
                    {
                        model: OrdenRepuesto, as: 'repuestos',
                        include: [{ model: Repuesto, as: 'repuesto' }]
                    },
                    { model: Observacion, as: 'observaciones' },
                    { model: OrdenFoto, as: 'fotos' },
                    { model: Prioridad, as: 'prioridad_orden' },
                    { model: EstadoOrden, as: 'estadoOrden' },
                ],
                order: [['fecha_ingreso', 'DESC']]
            });
        } else if (user.type == 'Mecánico' || user.id_type == '2') {
            // Si el usuario es un mecanico, se obtienen las ordenes asignadas a el
            return Orden.findAll({
                where: {
                    creado_por: user.id
                },
                include: [
                    {
                        model: AutoCliente, as: 'autoCliente',
                        include: [
                            { model: Cliente, as: 'cliente' },
                            { model: Auto, as: 'detalle', include: [{ model: Marca, as: 'marca_auto' }] }
                        ]
                    },
                    {
                        model: OrdenServicio, as: 'servicios',
                        include: [{ model: Servicio, as: 'servicio' }]
                    },
                    {
                        model: OrdenRepuesto, as: 'repuestos',
                        include: [{ model: Repuesto, as: 'repuesto' }]
                    },
                    { model: Observacion, as: 'observaciones' },
                    { model: OrdenFoto, as: 'fotos' },
                    { model: Prioridad, as: 'prioridad_orden' },
                    { model: EstadoOrden, as: 'estadoOrden' },
                ],
                order: [['fecha_ingreso', 'DESC']]
            });
        }
    } catch (error) {
        throw new Error("No tienes permisos para ver las ordenes" + error.message);
    }
}

/**
 * Obtiene una orden por su ID desde la base de datos.
 * @param {number} id - El ID de la orden a buscar.
 */
const getOrderById = async (id, user) => {
    console.log(user);

    try {
        // Si el usuarios es un administrador, puede ver cualquier orden
        if (user.type == 'Administrador' || user.id_type == '1') {
            return Orden.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: AutoCliente, as: 'autoCliente',
                        include: [
                            { model: Cliente, as: 'cliente' },
                            { model: Auto, as: 'detalle', include: [{ model: Marca, as: 'marca_auto' }] }
                        ]
                    },
                    {
                        model: OrdenServicio, as: 'servicios',
                        include: [{ model: Servicio, as: 'servicio' }]
                    },
                    {
                        model: OrdenRepuesto, as: 'repuestos',
                        include: [{ model: Repuesto, as: 'repuesto' }]
                    },
                    { model: Observacion, as: 'observaciones' },
                    { model: OrdenFoto, as: 'fotos' },
                    { model: Prioridad, as: 'prioridad_orden' },
                    { model: EstadoOrden, as: 'estadoOrden' },
                ]
            });
        } else if (user.type == 'Mecánico' || user.id_type == '2') {
            // Si el usuario es un mecanico, se obtienen la ordenen solo si está asignada a el
            return Orden.findOne({
                where: {
                    id: id,
                    creado_por: user.id
                },
                include: [
                    {
                        model: AutoCliente, as: 'autoCliente',
                        include: [
                            { model: Cliente, as: 'cliente' },
                            { model: Auto, as: 'detalle', include: [{ model: Marca, as: 'marca_auto' }] }
                        ]
                    },
                    {
                        model: OrdenServicio, as: 'servicios',
                        include: [{ model: Servicio, as: 'servicio' }]
                    },
                    {
                        model: OrdenRepuesto, as: 'repuestos',
                        include: [{ model: Repuesto, as: 'repuesto' }]
                    },
                    { model: Observacion, as: 'observaciones' },
                    { model: OrdenFoto, as: 'fotos' },
                    { model: Prioridad, as: 'prioridad_orden' },
                    { model: EstadoOrden, as: 'estadoOrden' },
                ]
            });
        }
    } catch (error) {
        throw new Error("No tienes permisos para ver la orden" + error.message);
    }
}

const getOrderPhotos = async (photosPaths) => {
    // Trae fotos desde public/uploads/order
    console.log(photosPaths);
    if (!photosPaths || photosPaths.length === 0) {
        return [];
    }

    // Verificación de tipos
    photosPaths.map(photo => {
        console.log('path', photo, typeof photo); // Verifica el tipo
    });

    const baseUrl = 'http://localhost:3000/uploads/order/';
    const photos = photosPaths
        .map(photo => ({
            id: photo.id,
            path: photo.url,
            url: `${baseUrl}${path.basename(photo.url)}`
        }))
        .filter(photo => fs.existsSync(`public/uploads/order/${path.basename(photo.path)}`)); // Accede correctamente a 'path'

    return photos;
};


const adaptOrderToFormFormat = (order, photos) => {
    return {
        client: order?.autoCliente?.cliente?.nombre || "",
        orderVehicle: order?.autoCliente?.id || "",
        estimatedDelivery: order?.fecha_entrega_estimada || "",
        kilometraje: order?.kilometraje || "",
        photos: [],
        uploadedPhotos: photos || "",
        priority: order?.id_prioridad || 2,
        state: order?.id_estado || 1,
        observations: order?.observaciones?.map(obs => obs.observacion).join(", ") || "",
        spareParts: order?.repuestos?.map(rep => ({
            sparePart: rep?.repuesto?.nombre || "",
            quantity: rep?.cantidad || "",
            price: rep?.precio_unitario || ""
        })) || [{ sparePart: "", quantity: "", price: "" }],
        services: order?.servicios?.map(serv => ({
            service: serv?.servicio?.nombre || "",
            price: serv?.precio || ""
        })) || [{ service: "", price: "" }],
        admissionReason: order?.motivo_ingreso || "",
        diagnosis: order?.diagnostico || "",
        totalSpareParts: order?.repuestos?.reduce((sum, rep) => sum + (rep.cantidad * rep.precio_unitario), 0) || 0,
        totalServices: order?.servicios?.reduce((sum, serv) => sum + serv.precio, 0) || 0,
        total: (order?.repuestos?.reduce((sum, rep) => sum + (rep.cantidad * rep.precio_unitario), 0) || 0) +
            (order?.servicios?.reduce((sum, serv) => sum + serv.precio, 0) || 0)

    };
};

export default {
    adaptOrderToFormFormat,
    registerOrder,
    registerOrderSpareParts,
    registerOrderService,
    registerOrderObservation,
    registerOrderPhoto,
    getAllOrders,
    getOrderById,
    getOrderPhotos
};
