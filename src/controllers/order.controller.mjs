import { uploadFiles, deleteFile, listFiles } from "../services/file.service.mjs";
import service from "../services/order.service.mjs";


/**
 * Registra una nueva orden en el sistema, incluyendo repuestos, servicios y archivos asociados.
 * 
 * @param {Array<number>} req.body.spareParts - Lista de IDs de repuestos asociados a la orden.
 * @param {Array<number>} req.body.quantitys - Cantidades de cada repuesto.
 * @param {Array<number>} req.body.spareParts_prices - Precios de cada repuesto.
 * @param {Array<number>} req.body.services - Lista de IDs de servicios asociados a la orden.
 * @param {Array<number>} req.body.services_prices - Precios de cada servicio.
 * @param {Object} req.files - Archivos subidos asociados a la orden.
 * @param {Object} req.user - Información del usuario autenticado.
 * @param {number} req.user.id - ID del usuario autenticado.
 * 
 * @throws {Error} Si ocurre un error durante el registro de la orden, repuestos, servicios o archivos.
 */
const registerOrder = async (req, res) => {
    try {
        const { services, services_prices, spareParts, quantitys, spareParts_prices, observations } = req.body;
        const order = await service.registerOrder(req.body, req.user.id);
        
        if (order && spareParts && spareParts.length > 0) {
           await Promise.all(
                spareParts.map((sparePart, index) => {
                    return service.registerOrderSpareParts(
                        {
                            id_sparePart: sparePart,
                            quantity: quantitys[index],
                            price: spareParts_prices[index]
                        }, 
                        order.id);        
                }
            ));
        }

        if (order) {
            await Promise.all(
                services.map((serviceForm, index) => {
                    return service.registerOrderService(
                        {
                            id_service: serviceForm,
                            price: services_prices[index]
                        }, 
                        order.id)           
                }) 
            );
        }

        if (order && observations != '') {
            await service.registerOrderObservation(
                observations, order.id
            );
        }

        if (req.files && req.files.length > 0) {
            const uploadedPhotos = await uploadFiles(req.files, {
                destination: 'order',
                maxFiles: 10,
                maxFileSize: 2 * 1024 * 1024, // 2MB
                allowedFileTypes: ['jpg', 'png', 'jpeg']
            });
    
            console.log('Archivos subidos:', uploadedPhotos);
            
            if (uploadedPhotos && uploadedPhotos.length > 0) {
                await Promise.all(
                    uploadedPhotos.map((photo) => {
                        return service.registerOrderPhoto(photo, order.id);
                    })
                );
                
            }
        }
        
        res.status(200).json({ 
            message: 'Orden registrada exitosamente',
            order: order,
            status: 'success',
        });

        
    } catch (error) {
        console.error('Error en registerOrder:', error);
        res.status(500).json({ message: error.message });
    }    
};

export { registerOrder };