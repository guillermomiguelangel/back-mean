const { Router } = require('express');
const { check } = require('express-validator');
const { search, searchById } = require('../controllers/search');

const router = Router();

router.get('/', search);

router.get('/:id', searchById);

module.exports = router;