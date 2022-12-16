const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// PUERTO
const port = process.env.PORT;
// SERVIDOR
const app = express();

// CONECTAR DB
dbConnection();

// CONFIGURAR CARPETA PUBLICA
app.use( express.static('public'));

// CORS
app.use( cors() );

// LECTURA Y PARSEO DEL BODY
app.use( express.json() );

//routes
app.use( '/api/auth', require('./routes/auth'));

app.listen( port , () => {
  console.log(`Servidor corriendo en puerto ${port}`)
})