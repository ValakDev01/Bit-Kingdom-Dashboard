const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Crypto = require('../models/cryptoModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const { convertCryptoPrices } = require('../utils/currencyConverter');

const logger = require('../configs/logger');

exports.getAllCryptos = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Crypto.find(), req.query).filter().sort().limitFields();

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
    totalCount: data.length,
    data: updatedData,
  });
});

exports.getOneCrypto = catchAsync(async (req, res, next) => {
  const data = await Crypto.findById(req.params.id);

  if (!data) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: "Couldn't find the cryptocurrency with the provided ID. Please try again!",
    });
  }

  const updatedData = await convertCryptoPrices([data]);

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    data: updatedData,
  });
});
