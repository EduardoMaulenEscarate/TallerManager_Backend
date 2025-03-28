import { uploadFiles, deleteFile, listFiles } from "../services/file.service.mjs";

const registerOrder = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No se han proporcionado archivos' });
        }

        const uploadedFiles = await uploadFiles(req.files, {
            destination: 'order',
            maxFiles: 3,
            maxFileSize: 2 * 1024 * 1024, // 2MB
            allowedFileTypes: ['jpg', 'png', 'jpeg']
        });

        console.log('Archivos subidos:', uploadedFiles);
        

        res.status(200).json({ 
            message: 'Archivos subidos exitosamente',
            files: uploadedFiles 
        });
    } catch (error) {
        console.error('Error en registerOrder:', error);
        res.status(500).json({ message: error.message });
    }    
};

export { registerOrder };