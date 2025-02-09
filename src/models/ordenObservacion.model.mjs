import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Orden from "./orden.model.mjs";

// Define el modelo de Observaciones
const Observacion = sequelize.define('Observacion', {
  id_orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Orden,
      key: 'id',
    }
  },
  observacion: {
    type: DataTypes.STRING(400),
    allowNull: false,
  }
},{
  tableName: 'ordenes_observaciones',
  timestamps: true
});

Observacion.belongsTo(Orden, {foreignKey: 'id_orden'});
Orden.hasMany(Observacion, {foreignKey: 'id_orden'});

export default Observacion;