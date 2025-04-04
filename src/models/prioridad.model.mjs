import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";;

// Define el modelo de Prioridad
const Prioridad = sequelize.define('Prioridad', {
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'prioridades',
  timestamps: false,
});

export default Prioridad;