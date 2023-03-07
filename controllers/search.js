const { response } = require('express');
const Usuario = require('../models/Usuario');

const search = async(req, res = response) => {

    const { interests, coords } = req.query;
    
    try {
        const result = await Usuario.find( { "service": { "$regex": interests, "$options": "i" } });

        if (result.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No existen resultados que coincidan con tu término de búsqueda.'
            })
        }

        return res.status(201).json({
            ok: true,
            result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hablar con el administrador'
        })
    }
}

const searchById = async(req, res = response) => {

    const { id } = req.params;

    try {
        const result = await Usuario.findById(id);

        if (result.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No existen usuarios asociados a estos datos.'
            })
        }

        return res.status(201).json({
            ok: true,
            result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hablar con el administrador'
        })
    }
}

module.exports = {
    search,
    searchById
}