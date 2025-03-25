import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 
                              'text/plain', 'text/csv', 
                              'application/msword', 
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                              'application/vnd.ms-excel', 
                              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                              'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'), false);
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
});

export { 
    upload
};