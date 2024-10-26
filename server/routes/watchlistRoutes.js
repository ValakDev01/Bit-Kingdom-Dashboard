const express = require('express');

const {
  addToWatchlist,
  getAllWatchlist,
  removeFromWatchlist,
} = require('../controllers/watchlistController');

const { protect } = require('../controllers/authController');

const { aliasAllCryptos } = require('../middlewares/aliasAllCryptos');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(aliasAllCryptos, getAllWatchlist)
  .patch(addToWatchlist)
  .delete(removeFromWatchlist);

module.exports = router;
