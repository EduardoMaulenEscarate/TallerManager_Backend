import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import AutoCliente from "./autoCliente.model.mjs";
import User from "./user.model.mjs";
import EstadoOrden from "./estadoOrden.model.mjs";

// Define el modelo de Orden
const Orden = sequelize.define('Orden', {
  creado_por: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_auto_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AutoCliente,
      key: 'id',
    }
  },
  numero_orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kilometraje: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  motivo_ingreso: {
    type: DataTypes.STRING(400),
    allowNull: true,
  },
  diagnostico: {
    type: DataTypes.STRING(400),
    allowNull: true,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EstadoOrden,
      key: 'id',
    }
  }
},{
  tableName: 'ordenes',
  timestamps: true
});

export default Orden;