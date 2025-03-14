const saveFileData = async (files) => {
    // Aquí podrías guardar la info en la base de datos
    const fileData = files.map((file) => ({
        filename: file.filename,
        path: file.path,
        size: file.size,
    }));

    console.log("Archivos guardados:", fileData);
    return fileData;
};

export { saveFileData };