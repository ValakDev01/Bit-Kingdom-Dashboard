const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Crypto = require('../models/cryptoModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCryptos = async (req, res, next) => {
  try {
    const features = new APIFeatures(Crypto.find(), req.query).filter().sort().limitFields();

    const isPaginated = await features.paginate();

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
  } catch (err) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      status: ReasonPhrases.SERVICE_UNAVAILABLE,
      message: err.message,
    });
  }
};

exports.getOneCrypto = async (req, res, next) => {
  try {
    const data = await Crypto.findById(req.params.id);

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      data: data,
    });
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: err.message,
    });
  }
};
