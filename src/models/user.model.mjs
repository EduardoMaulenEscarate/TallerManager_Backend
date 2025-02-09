import { DataTypes } from 'sequelize';
import sequelize from './index.mjs';
import Tipo from './tipo.model.mjs';
// Define el modelo de Usuario
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references:{
            model: Tipo,
            key: 'id',
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    tableName: 'users',
    timestamps: true,
});

User.belongsTo(Tipo, {foreignKey: 'type', as: 'tipoUsuario'});
Tipo.hasMany(User, {foreignKey: 'type', as: 'usuarios'});

export default User;