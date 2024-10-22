const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const logger = require('../configs/logger');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(StatusCodes.CREATED).json({
    status: ReasonPhrases.CREATED,
    token,
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide a valid email or password!', StatusCodes.BAD_REQUEST));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password!', StatusCodes.UNAUTHORIZED));
  }

  const token = signToken(user._id);

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    token,
    message: 'You successfully logged in!',
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', StatusCodes.UNAUTHORIZED),
    );
  }

  const decodedData = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decodedData.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token doesn't longer exist!",
        StatusCodes.UNAUTHORIZED,
      ),
    );
  }

  logger.info(decodedData.iat);

  if (currentUser.changedPasswordAfter(decodedData.iat)) {
    return next(
      new AppError(
        'You recently changed your password. Please log in again!',
        StatusCodes.UNAUTHORIZED,
      ),
    );
  }

  req.user = currentUser;

  next();
});
