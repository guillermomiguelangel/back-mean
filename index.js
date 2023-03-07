"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server = __importDefault(require("./classes/server"));
const server = Server.default.instance;

const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const port = process.env.PORT;

// CONECTAR DB
dbConnection();

// CONFIGURAR CARPETA PUBLICA
server.app.use( express.static('public'));

// CORS
server.app.use(cors()) // Use this after the variable declaration

// LECTURA Y PARSEO DEL BODY
server.app.use( express.json() );

//routes
server.app.use('/search', require('./routes/search'));
server.app.use('/', require('./routes/router'));
server.app.use( '/api/auth', require('./routes/auth'));

//manejar otras rutas
server.app.get( '*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
});

//correr servidor
server.start(() => {
    console.log(`El servidor esta corriendo en el ${port}`);
});
