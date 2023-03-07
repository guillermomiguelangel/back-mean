const mongoose = require("mongoose");

const dbConnection = async ()=>{

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CONNECTION, { 
            maxIdleTimeMS: 80000,
            serverSelectionTimeoutMS: 80000,
            socketTimeoutMS: 0,
            connectTimeoutMS: 0
        })

        console.log('Base de datos inicializada');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }

}

module.exports = {
    dbConnection
}