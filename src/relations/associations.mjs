import User from "../models/user.model.mjs";
import Tipo from "../models/tipo.model.mjs";
import Cliente from "../models/cliente.model.mjs";
import AutoCliente from "../models/autoCliente.model.mjs";
import Auto from "../models/auto.model.mjs";
import Orden from "../models/orden.model.mjs";
import EstadoOrden from "../models/estadoOrden.model.mjs";
import Repuesto from "../models/repuesto.model.mjs";
import RepuestoOrden from "../models/repuestoOrden.model.mjs";
import Observacion from "../models/ordenObservacion.model.mjs";
import OrdenFoto from "../models/ordenFoto.model.mjs";
import OrdenServicio from "../models/ordenServicio.model.mjs";
import Servicio from "../models/servicio.model.mjs";
import AutoClienteFoto from "../models/autoClienteFoto.model.mjs";

// Define las relaciones entre los modelos
User.belongsTo(Tipo, {foreignKey: 'type', as: 'tipoUsuario'});
Tipo.hasMany(User, {foreignKey: 'type', as: 'usuarios'});

Cliente.belongsTo(User, {foreignKey: 'creado_por'});    
User.hasMany(Cliente, {foreignKey: 'creado_por'});

AutoCliente.belongsTo(Cliente, {foreignKey: 'id_cliente'});
Cliente.hasMany(AutoCliente, {foreignKey: 'id_cliente'});

AutoCliente.belongsTo(Auto, {foreignKey: 'id_auto'});
Auto.hasMany(AutoCliente, {foreignKey: 'id_auto'});

//Relacion Ordenes
Orden.belongsTo(User, {foreignKey: 'creado_por'});
User.hasMany(Orden, {foreignKey: 'creado_por'});

Orden.belongsTo(AutoCliente, {foreignKey: 'id_auto_cliente'});
AutoCliente.hasMany(Orden, {foreignKey: 'id_auto_cliente'});

Orden.belongsTo(EstadoOrden, {foreignKey: 'estado'});
EstadoOrden.hasMany(Orden, {foreignKey: 'estado'});
//End Relacion Ordenes

//Relacion Repuestos ordenes
RepuestoOrden.belongsTo(Orden, {foreignKey: 'id_order'});
Orden.hasMany(RepuestoOrden, {foreignKey: 'id_order'});

RepuestoOrden.belongsTo(Repuesto, {foreignKey: 'id_repuesto'});
Repuesto.hasMany(RepuestoOrden, {foreignKey: 'id_repuesto'});
//End Relacion Repuestos ordenes

//Relacion Observaciones
Observacion.belongsTo(Orden, {foreignKey: 'id_orden'});
Orden.hasMany(Observacion, {foreignKey: 'id_orden'});
//End Relacion Observaciones

//Relacion OrdenFoto
OrdenFoto.belongsTo(Orden, {foreignKey: 'id_orden'});
Orden.hasMany(OrdenFoto, {foreignKey: 'id_orden'});
//End Relacion OrdenFoto

//Relacion OrdenServicio
OrdenServicio.belongsTo(Orden, {foreignKey: 'id_orden'});
Orden.hasMany(OrdenServicio, {foreignKey: 'id_orden'});

OrdenServicio.belongsTo(Servicio, {foreignKey: 'id_servicio'});
Servicio.hasMany(OrdenServicio, {foreignKey: 'id_servicio'});
//End Relacion OrdenServicio

//Relacion AutoClienteFoto
AutoClienteFoto.belongsTo(AutoCliente, {foreignKey: 'id_auto_cliente'});
AutoCliente.hasMany(AutoClienteFoto, {foreignKey: 'id_auto_cliente'});
//End Relacion AutoClienteFoto