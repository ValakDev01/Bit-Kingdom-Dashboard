const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Crypto = require('../models/cryptoModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.updateCryptoFavoriteStatus = catchAsync(async (req, res, next) => {
  const { isWatchlisted } = req.body;

  if (typeof isWatchlisted !== 'boolean') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: ReasonPhrases.BAD_REQUEST,
      message: 'Invalid value for isWatchlisted. It must be true or false.',
    });
  }

  const updatedCrypto = await Crypto.findByIdAndUpdate(
    req.params.id,
    { isWatchlisted },
    { new: true, runValidators: true },
  );

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    data: updatedCrypto,
  });
});

exports.getAllWatchlist = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Crypto.find({ isWatchlisted: true }), req.query)
    .filter()
    .sort()
    .limitFields();

  const isPaginated = await features.paginate(Crypto);

  if (!isPaginated) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: "This page doesn't exist!",
    });
  }

  const data = await features.query;

  if (!data || data.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: 'No cryptocurrencies found!',
    });
  }

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    results: data.length,
    data: data,
  });
});

exports.removeFromWatchlist = catchAsync(async (req, res, next) => {
  const crypto = await Crypto.findById(req.params.id);

  if (!crypto) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: 'Cryptocurrency not found!',
    });
  }
  if (!crypto.isWatchlisted) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: ReasonPhrases.BAD_REQUEST,
      message: 'Cryptocurrency is not in the watchlist!',
    });
  }

  await Crypto.findByIdAndUpdate(
    req.params.id,
    { isWatchlisted: false },
    { new: true, runValidators: true },
  );

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    message: 'Cryptocurrency was removed from the watchlist!',
  });
});
