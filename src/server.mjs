import sequelize from './models/index.mjs';
import app from './app.mjs';
import { PORT } from './config/config.mjs';

console.log('Iniciando la aplicación...');
console.log('Sincronizando la base de datos...');
/* app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); */

(async () => {
    try {
        console.log('Iniciando la aplicación...');
        console.log('Sincronizando la base de datos...');

        // await sequelize.sync({ alter: true });

        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message || error.stack);
    }
})();

