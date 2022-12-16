const mongoose = require("mongoose");

const dbConnection = async ()=>{

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CONNECTION);

        console.log('Base de datos inicializada');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }

}

module.exports = {
    dbConnection
}