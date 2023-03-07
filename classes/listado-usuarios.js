"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class ListaUsuarios {
    constructor() {
        this.lista = [];
    }

    agregar(usuario) {
        this.lista.push(usuario);
        console.log(usuario);
        return usuario;
    }

    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('======actualizando usuario=======');
        console.log(this.lista);
    }

    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }

    //obtener usuarios sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    borrarUsuario(id) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id;
        });
        return tempUser;
    }
}

exports.ListaUsuarios = ListaUsuarios;
