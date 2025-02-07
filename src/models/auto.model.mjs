import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";

// Define el modelo de Auto
const Auto = sequelize.define('Auto', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
},{
  tableName: 'autos',
  timestamps: false,
});

export default Auto;