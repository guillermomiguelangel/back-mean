const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('name', 'Ingresá tu nombre').notEmpty(),
    check('lastname', 'Ingresá tu apellido').notEmpty(),
    check('email', 'Ingresá un email válido').isEmail().normalizeEmail(),
    check('phone', 'Ingresá tu número de teléfono').isMobilePhone(['es-AR']),
    check('whatsapp', 'Ingresá tu número de whatsapp').isMobilePhone(['es-AR']),
    check('service', 'Ingresá que servicios deseas prestar').notEmpty(),
    check('payment', 'Ingresá que métodos de pago aceptas para realizar el cobro por tus servicios').notEmpty(),
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