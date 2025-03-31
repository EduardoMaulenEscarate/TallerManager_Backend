
/**
 * @fileoverview Middleware para normalizar los campos de un request.
 *               Convierte los campos especificados en un arreglo si son strings o vienen vacíos.
 * @param {Array} fieldsToNormalize - Arreglo de nombres de campos a normalizar.
 * */
const normalizer = (fieldsToNormalize) => {
    return (req, res, next) => {
        fieldsToNormalize.forEach(field => {
            if (!req.body[field]) {
                req.body[field] = [];
                return;
            }

            if (typeof req.body[field] === 'string') {
                req.body[field] = [req.body[field]];
            }
        });

        next();
    }
}

export { normalizer };

