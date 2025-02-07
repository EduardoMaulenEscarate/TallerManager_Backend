import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";

// Define el modelo de Repuesto
const Repuesto = sequelize.define('Repuesto', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
},{
  tableName: 'repuestos',
  timestamps: false,
})

export default Repuesto;