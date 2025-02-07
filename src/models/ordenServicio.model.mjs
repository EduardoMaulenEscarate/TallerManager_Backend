import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Servicio from "./servicio.model.mjs";
import Orden from "./orden.model.mjs";

// Define el modelo de Orden de Servicio
const OrdenServicio = sequelize.define('Servicio', {
  id_orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Orden,
      key: 'id',
    }
  },
  id_servicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Servicio,
      key: 'id',
    }
  }
},{
  tableName: 'ordenes_servicios',
  timestamps: true,
});

export default OrdenServicio;