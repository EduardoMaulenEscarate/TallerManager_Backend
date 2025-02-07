import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";

// Define el modelo de EstadoOrden
const EstadoOrden = sequelize.define('EstadoOrden', {
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  }
},{
  tableName: 'estados_ordenes',
  timestamps: false,  
});

export default EstadoOrden;