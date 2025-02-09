import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Orden from "./orden.model.mjs";

// Define el modelo de OrdenFoto
const OrdenFoto = sequelize.define('OrdenFoto', {
  id_orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Orden,
      key: 'id',
    }
  },
  url: {
    type: DataTypes.STRING(200),
    allowNull: false,
  }
},{
  tableName: 'ordenes_fotos',
  key: 'id',
});

OrdenFoto.belongsTo(Orden, {foreignKey: 'id_orden'});
Orden.hasMany(OrdenFoto, {foreignKey: 'id_orden'});

export default OrdenFoto;