"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");

const router = Router();

router.get('/messages', (req, res) => {
    res.json({
        ok: true,
        msg: 'trayendo mensajes!!'
    });
});

router.post('/messages', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = { de, cuerpo };
    const server = server_1.default.instance;
    server.io.emit('nuevo-mensaje', payload);
    res.json({
        ok: true,
        msg: `posteando nuevo mensaje general`,
        cuerpo,
        de
    });
});

router.post('/messages/:id', (req, res) => {
    const cuerpo = req.body;
    const de = req.body.de;
    const id = req.params.id;
    const payload = { de, cuerpo };
    const server = server_1.default.instance;
    server.io.in(id).emit('nuevo-mensaje-privado', payload);
    res.json({
        ok: true,
        msg: `posteando mensaje privado ${id}`,
        cuerpo,
        de,
        id
    });
});

router.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const server = server_1.default.instance;
    yield server.io.fetchSockets()
        .then((sockets) => {
        let clients = [];
        sockets.forEach((client) => {
            clients.push(client.id);
        });
        return res.json({
            ok: true,
            clientes: clients
        });
    })
        .catch(err => {
        res.json({
            ok: false,
            clientes: []
        });
    });
}));

router.get('/usuarios/detalle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        ok: false,
        clientes: sockets_1.usuariosConectados.getLista()
    });
}));

module.exports = router ;

