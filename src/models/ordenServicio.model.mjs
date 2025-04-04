import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Orden from "./orden.model.mjs";
import Servicio from "./servicio.model.mjs";

// Define el modelo de Orden de Servicio
const OrdenServicio = sequelize.define('OrdenServicio', {
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
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
},{
  tableName: 'ordenes_servicios',
  timestamps: true,
});

OrdenServicio.belongsTo(Orden, {foreignKey: 'id_orden', as: 'orden'});
Orden.hasMany(OrdenServicio, {foreignKey: 'id_orden', as: 'servicios'});

OrdenServicio.belongsTo(Servicio, {foreignKey: 'id_servicio', as: 'servicio'});
Servicio.hasMany(OrdenServicio, {foreignKey: 'id_servicio', as : 'serviciosOrdenes'});

export default OrdenServicio;