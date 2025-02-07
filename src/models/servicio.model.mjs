import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";

// Define el modelo de Servicio
const Servicio = sequelize.define('Servicio', {
  nombre: {
    type: DataTypes.STRING(100),
  }
},{
  tableName: 'servicios',
  key: 'id',
});

export default Servicio;