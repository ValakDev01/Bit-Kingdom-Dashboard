const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Crypto = require('../models/cryptoModel');

exports.getAllCryptos = async (req, res, next) => {
  try {
    const data = await Crypto.find();

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
