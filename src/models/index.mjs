import { Sequelize } from 'sequelize';
import { DB } from '../config/config.mjs';

// Inicializa Sequelize con la configuración de MySQL
const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: 'mysql',
});

// Verifica la conexión
sequelize.authenticate()
    .then(() => console.log('Conexión establecida con la base de datos'))
    .catch(err => {
            console.error('Error al conectar a la base de datos:', err);
        }
    );

export default sequelize;