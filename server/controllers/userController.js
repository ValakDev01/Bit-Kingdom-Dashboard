const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields();

  const isPaginated = await features.paginate(User);

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
      message: 'No users found!',
    });
  }
  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    results: data.length,
    data: data,
  });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const data = await User.findById(req.params.id);

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    data: data,
  });
});
