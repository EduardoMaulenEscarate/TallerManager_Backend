import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Cliente from "./cliente.model.mjs";
import Auto from "./auto.model.mjs";

// Define el modelo de AutoCliente
const AutoCliente = sequelize.define('AutoCliente', {
  id_auto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Auto,
      key: 'id',
    }
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'id',
    }
  },
  patente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  n_chasis: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'autos_clientes',
  timestamps: false,
})

AutoCliente.belongsTo(Auto, { foreignKey: 'id_auto', as: 'detalle' });
Auto.hasMany(AutoCliente, { foreignKey: 'id_auto', as: 'autos' });

AutoCliente.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
Cliente.hasMany(AutoCliente, { foreignKey: 'id_cliente', as: 'autos' });


export default AutoCliente;