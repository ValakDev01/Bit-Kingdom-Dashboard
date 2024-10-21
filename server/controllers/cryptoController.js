const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Crypto = require('../models/cryptoModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

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

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    totalCount: data.length,
    data: data,
  });
});

exports.getOneCrypto = catchAsync(async (req, res, next) => {
  const data = await Crypto.findById(req.params.id);

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    data: data,
  });
});
