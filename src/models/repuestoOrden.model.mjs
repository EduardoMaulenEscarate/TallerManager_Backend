import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Repuesto from "./repuesto.model.mjs";
import Orden from "./orden.model.mjs";

// Define el modelo de RepuestoOrden
const RepuestoOrden = sequelize.define('RepuestoOrden', {
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
  tableName: 'repuestos_ordenes',
  timestamps: false,
});

RepuestoOrden.belongsTo(Orden, {foreignKey: 'id_order'});
Orden.hasMany(RepuestoOrden, {foreignKey: 'id_order'});

RepuestoOrden.belongsTo(Repuesto, {foreignKey: 'id_repuesto'});
Repuesto.hasMany(RepuestoOrden, {foreignKey: 'id_repuesto'});

export default RepuestoOrden;