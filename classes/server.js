"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/sockets"));

class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = new http_1.default.Server(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        this.escucharSocket();
    }
    static get instance() {
        return this._instance || (this._instance = new this);
    }
    start(callback) {
        this.httpServer.listen(process.env.PORT, callback);
    }
    escucharSocket() {
        console.log('Escuchando conexiones - socket');
        this.io.on('connection', cliente => {
            socket.conectarCliente(cliente, this.io);
            //configurar usuario
            socket.configurarUsuario(cliente, this.io);
            //obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);
            //envio de mensajes
            socket.mensaje(cliente, this.io);
            //desconectar
            socket.desconectar(cliente, this.io);
        });
    }
}
exports.default = Server;
