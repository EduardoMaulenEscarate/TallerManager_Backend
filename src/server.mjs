import sequelize from './models/index.mjs';
import app from './app.mjs';
import { PORT } from './config/config.mjs';
import Auto from './models/auto.model.mjs';
import Cliente from './models/cliente.model.mjs';
import Servicio from './models/servicio.model.mjs';
import Tipo from './models/tipo.model.mjs';
import EstadoOrden from './models/estadoOrden.model.mjs';
import Repuesto from './models/repuesto.model.mjs';
import AutoCliente from './models/autoCliente.model.mjs';
import Orden from './models/orden.model.mjs';
import RepuestoOrden from './models/repuestoOrden.model.mjs';
import Observacion from './models/ordenObservacion.model.mjs';
import OrdenFoto from './models/ordenFoto.model.mjs';
import OrdenServicio from './models/ordenServicio.model.mjs';
import AutoClienteFoto from './models/autoClienteFoto.model.mjs';
console.log('Iniciando la aplicación...');
console.log('Sincronizando la base de datos...');
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

/* (async () => {
    try {
        console.log('Iniciando la aplicación...');
        console.log('Sincronizando la base de datos...');

        await sequelize.sync({ alter: true });

        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message || error.stack);
    }
})(); 

 */