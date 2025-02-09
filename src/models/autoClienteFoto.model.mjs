import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import AutoCliente from "./autoCliente.model.mjs";

// Define el modelo de Foto de Cliente
const AutoClienteFoto = sequelize.define('AutoClienteFoto', {
  id_auto_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AutoCliente,
      key: 'id',
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  tableName: 'auto_cliente_fotos',
  timestamps: false,
});

AutoClienteFoto.belongsTo(AutoCliente, {foreignKey: 'id_auto_cliente'});
AutoCliente.hasMany(AutoClienteFoto, {foreignKey: 'id_auto_cliente'});

export default AutoClienteFoto;