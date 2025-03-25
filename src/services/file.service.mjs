import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const uploadFiles = async (files, options = {}) => {
    const {
        destination = 'uploads',
        fieldName = 'files',
        maxFiles = 5,
        maxFileSize = 5 * 1024 * 1024, // 5MB default
        allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf']
    } = options;

    if (!files || files.length === 0) {
        throw new Error('No se han proporcionado archivos');
    }

    if (files.length > maxFiles) {
        throw new Error(`Máximo número de archivos permitidos: ${maxFiles}`);
    }

    const invalidFiles = files.filter(file => {
        if (file.size > maxFileSize) {
            return true;
        }

        const extname = path.extname(file.originalname).toLowerCase();
        const fileType = file.mimetype;
        
        const isAllowedFileType = allowedFileTypes.some(type => 
            fileType.includes(type) || 
            allowedFileTypes.includes(extname.replace('.', ''))
        );

        return !isAllowedFileType;
    });

    if (invalidFiles.length > 0) {
        const invalidFileNames = invalidFiles.map(file => file.originalname);
        throw new Error(`Archivos inválidos: ${invalidFileNames.join(', ')}. 
            Verifica tamaño (máximo ${maxFileSize/1024/1024}MB) y tipos permitidos: ${allowedFileTypes.join(', ')}`);
    }

    const destinationPath = path.join(__dirname, `../../public/uploads/${destination}`);

    try {
        fs.mkdirSync(destinationPath, { recursive: true });
    } catch (error) {
        console.error('Error creando directorio:', error);
        throw new Error(`No se pudo crear el directorio de destino: ${destinationPath}`);
    }

    const uploadedFiles = await Promise.all(files.map(async (file) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        const fullPath = path.join(destinationPath, uniqueName);

        try {
            await fs.promises.writeFile(fullPath, file.buffer);

            return {
                originalName: file.originalname,
                filename: uniqueName,
                path: fullPath,
                size: file.size,
                mimetype: file.mimetype
            };
        } catch (error) {
            console.error('Error guardando archivo:', error);
            throw new Error(`No se pudo guardar el archivo ${file.originalname}: ${error.message}`);
        }
    }));

    return uploadedFiles;
};

const deleteFile = (filePath) => {
    try {
        const absolutePath = path.resolve(filePath);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            return { success: true, message: 'Archivo eliminado correctamente' };
        }
        return { success: false, message: 'El archivo no existe' };
    } catch (error) {
        console.error('Error borrando archivo:', error);
        return { 
            success: false, 
            message: 'Error al eliminar el archivo',
            error: error.message 
        };
    }
};

const listFiles = (directoryPath) => {
    try {
        const absolutePath = path.resolve(directoryPath);
        return fs.readdirSync(absolutePath);
    } catch (error) {
        console.error('Error listando archivos:', error);
        return [];
    }
};

export { 
    uploadFiles, 
    deleteFile, 
    listFiles 
};