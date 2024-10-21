const express = require('express');

const { getAllCryptos, getOneCrypto } = require('../controllers/cryptoController');

const { aliasAllCryptos } = require('../middlewares/aliasAllCryptos');

const router = express.Router();

router.route('/').get(aliasAllCryptos, getAllCryptos);

router.route('/:id').get(getOneCrypto);

module.exports = router;
