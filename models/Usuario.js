const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: { 
        type: Date, 
        default: Date.now()
    },
    address: {
        type: String
    },
    postalcode: { 
        type: Number
    },
    coords: [{
        type:String,
        default:[]
    }],
    phone: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    terms: {
        type: Boolean,
        required: true
    },
    service: {
        type:String,
        required: true
    },
    payment: [{
        type:String
    }],
    img: [{
        type:String
    }],
});
module.exports = model('Usuario', UsuarioSchema);