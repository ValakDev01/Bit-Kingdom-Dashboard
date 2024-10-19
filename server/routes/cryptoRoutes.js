const express = require('express');

const { getAllCryptos } = require('../controllers/cryptoController');

const router = express.Router();

router.route('/').get(getAllCryptos);

module.exports = router;
