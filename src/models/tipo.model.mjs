import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";

// Define el modelo de Tipos
const Tipo = sequelize.define("Tipo", {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
},
{
    tableName: 'tipos_usuarios',
    timestamps: false,
});

export default Tipo;