import { saveFileData } from "../services/file.service.mjs";

// Subir archivos
const uploadFiles = async (req, res) => {
    try {
        // Accedemos a los archivos desde `req.files`
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: "No se han subido archivos" });
        }

        // Guardar información en la base de datos (opcional)
        // const savedFiles = await saveFileData(files);

        res.status(200).json({
            message: "Archivos subidos correctamente",
            files: savedFiles,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { uploadFiles };