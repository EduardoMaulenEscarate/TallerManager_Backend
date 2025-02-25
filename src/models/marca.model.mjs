import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";

// Define el modelo de Marca
const Marca = sequelize.define("Marca", {
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
},
    {
        tableName: 'marcas',
        timestamps: true,
    });

export default Marca;