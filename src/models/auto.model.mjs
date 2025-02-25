import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Marca from "./marca.model.mjs";

// Define el modelo de Auto
const Auto = sequelize.define('Auto', {
  marca: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Marca,
      key: 'id',
    }
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  tableName: 'autos',
  timestamps: false,
});

Auto.belongsTo(Marca, { foreignKey: 'marca', as: 'marca_auto' });
Marca.hasMany(Auto, { foreignKey: 'marca', as: 'autos' });

export default Auto;