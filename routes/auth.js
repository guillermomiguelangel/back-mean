const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('email', 'El email es obligatorio').isEmail(),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contraseña debe ser igual o mayor a 6 caracteres').isLength({min:6}),
    validarCampos
]
, crearUsuario);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser igual o mayor a 6 caracteres').isLength({min:6}),
    validarCampos
], loginUsuario);

router.get('/renew', validarJWT, renovarToken);

module.exports = router;