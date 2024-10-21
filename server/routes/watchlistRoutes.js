const express = require('express');

const {
  updateCryptoFavoriteStatus,
  getAllWatchlist,
  removeFromWatchlist,
} = require('../controllers/watchlistController');

const { aliasAllCryptos } = require('../middlewares/aliasAllCryptos');

const router = express.Router();

router.route('/').get(aliasAllCryptos, getAllWatchlist);

router.route('/:id').patch(updateCryptoFavoriteStatus).delete(removeFromWatchlist);

module.exports = router;
