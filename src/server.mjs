import sequelize from './models/index.mjs';
import app from './app.mjs';
import { PORT } from './config/config.mjs';

console.log('Iniciando la aplicación...');
sequelize.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
.catch(err => console.error('Error al iniciar la aplicación:', err));


/* 
sequelize.sync({ alter: true }) // Sincroniza el modelo con la base de datos
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));
 */