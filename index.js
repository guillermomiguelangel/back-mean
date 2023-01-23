const express = require('express');
const cors = require('cors');
const path = require('path');
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
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// LECTURA Y PARSEO DEL BODY
app.use( express.json() );

//routes
app.use( '/api/auth', require('./routes/auth'));

//manejar otras rutas
app.get( '*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
});

app.listen( port , () => {
  console.log(`Servidor corriendo en puerto ${port}`)
})