import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import User from "./user.model.mjs";

// Define el modelo de Cliente
const Cliente = sequelize.define("Cliente", {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(13),
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  creado_por: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    }
  }
},
{
    tableName: 'clientes',
    timestamps: true,
});

export default Cliente;