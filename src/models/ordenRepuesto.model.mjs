import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Repuesto from "./repuesto.model.mjs";
import Orden from "./orden.model.mjs";

// Define el modelo de OrdenRepuesto
const OrdenRepuesto = sequelize.define('OrdeRepuesto', {
  id_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Orden,
      key: 'id',
    }
  },
  id_repuesto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Repuesto,
      key: 'id',
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
},{
  tableName: 'ordenes_repuestos',
  timestamps: false,
});

OrdenRepuesto.belongsTo(Orden, {foreignKey: 'id_order', as: 'orden'});
Orden.hasMany(OrdenRepuesto, {foreignKey: 'id_order', as: 'repuestos'});

OrdenRepuesto.belongsTo(Repuesto, {foreignKey: 'id_repuesto', as: 'repuesto'});
Repuesto.hasMany(OrdenRepuesto, {foreignKey: 'id_repuesto', as : 'ordenesRepuestos'});

export default OrdenRepuesto;