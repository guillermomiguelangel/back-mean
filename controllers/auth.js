const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    console.log(req.body);

    try {
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            })
        }

        //crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        //hashear la constraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //guardar usuario en base de datos
        await dbUser.save();

        //generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hablar con el administrador'
        })
    }
};

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {


        const dbUser = await Usuario.findOne({email});

        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'Las credenciales no son válidas'
            })
        }        

        //confirmar si el password es correcto
        const validPass = bcrypt.compareSync(password, dbUser.password);

        if(!validPass){
            return res.status(400).json({
                ok: false,
                msg: 'Las credenciales no son válidas'
            })
        }

        //generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //generar respuesta exitosa
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hablar con el administrador'
        })
    }
}

const renovarToken = async(req, res = response) => {

    const { uid } = req;

    const {name,email} = await Usuario.findById(uid);
    
    //generar el JWT
    const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        email,
        token,
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}