import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";

// Define el modelo de Servicio
const Servicio = sequelize.define('Servicio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
},{
  tableName: 'servicios',
  key: 'id',
});

export default Servicio;