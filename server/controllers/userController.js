const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};

  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. You should use /updateMyPassword instead!',
        StatusCodes.BAD_REQUEST,
      ),
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    message: 'Your profile has been updated!',
    data: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(StatusCodes.NO_CONTENT).json({
    status: ReasonPhrases.NO_CONTENT,
    message: 'Your account has been deleted!',
  });
});
