const express = require('express');

const { getAllCryptos, getOneCrypto } = require('../controllers/cryptoController');

const router = express.Router();

router.route('/').get(getAllCryptos);

router.route('/:id').get(getOneCrypto);

module.exports = router;
