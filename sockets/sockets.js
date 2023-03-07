"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const listado_usuarios = require("../classes/listado-usuarios");
const usuario = require("../classes/usuario");

exports.usuariosConectados = new listado_usuarios.ListaUsuarios();

const conectarCliente = (cliente, io) => {
    const usuarioActivo = new usuario.Usuario(cliente.id);
    console.log('cliente conectado', cliente);
    exports.usuariosConectados.agregar(usuarioActivo);
    io.emit('usuarios-activos', exports.usuariosConectados.getLista());
};
exports.conectarCliente = conectarCliente;

const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado'); 
        exports.usuariosConectados.borrarUsuario(cliente.id);
    });
};
exports.desconectar = desconectar;

const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        // console.log('Mensaje recibido', payload);
        io.emit('nuevo-mensaje', payload);
    });
};
exports.mensaje = mensaje;

const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario: ${payload.nombre}, configurado`
        });
    });
};
exports.configurarUsuario = configurarUsuario;

const obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuario', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
