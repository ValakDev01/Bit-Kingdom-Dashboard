const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Crypto = require('../models/cryptoModel');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const { convertCryptoPrices } = require('../utils/currencyConverter');

exports.addToWatchlist = catchAsync(async (req, res, next) => {
  const { symbol } = req.body;

  if (!symbol) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: ReasonPhrases.BAD_REQUEST,
      message: 'The cryptocurrency symbol is required!',
    });
  }

  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: 'User not found!',
    });
  }

  if (currentUser.watchlist.includes(symbol)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: ReasonPhrases.BAD_REQUEST,
      message: 'Cryptocurrency is already in the watchlist!',
    });
  }

  currentUser.watchlist.push(symbol);
  await currentUser.save({ validateModifiedOnly: true });

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    data: currentUser,
  });
});

exports.getAllWatchlist = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: 'User not found!',
    });
  }

  const cryptoQuery = Crypto.find({ symbol: { $in: currentUser.watchlist } });
  const features = new APIFeatures(cryptoQuery, req.query).filter().sort().limitFields();

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

  const updatedData = await convertCryptoPrices(data);

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    results: data.length,
    data: updatedData,
  });
});

exports.removeFromWatchlist = catchAsync(async (req, res, next) => {
  const { symbol } = req.body;

  if (!symbol) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: ReasonPhrases.BAD_REQUEST,
      message: 'The cryptocurrency symbol is required for deleting!',
    });
  }

  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: 'User not found!',
    });
  }

  if (!currentUser.watchlist.includes(symbol)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: ReasonPhrases.BAD_REQUEST,
      message: 'Cryptocurrency is not in the watchlist!',
    });
  }

  currentUser.watchlist = currentUser.watchlist.filter((item) => item !== symbol);

  await currentUser.save({ validateModifiedOnly: true });

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
  });
});
