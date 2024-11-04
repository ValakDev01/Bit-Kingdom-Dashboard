const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/userModel');
const Settings = require('../models/settingsModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError("It's not an image! Please upload only images.", StatusCodes.BAD_REQUEST),
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};

  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const userId = req.user ? req.user.id : 'aliasUserID';
  req.file.filename = `user-${userId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

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

exports.getMe = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: ReasonPhrases.NOT_FOUND,
      message: 'No user found with this ID!',
    });
  }

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    totalCount: currentUser.watchlist.length,
    data: currentUser,
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

  if (req.file) filteredBody.photo = req.file.filename;

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
  await User.findByIdAndUpdate(req.user.id, { active: 'deactivated' });

  res.status(StatusCodes.NO_CONTENT).json({
    status: ReasonPhrases.NO_CONTENT,
    message: 'Your account has been deleted!',
  });
});

exports.updateSettings = catchAsync(async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError('No data provided to update settings!', StatusCodes.BAD_REQUEST));
  }

  const userSettings = await Settings.findOne({ user: req.user.id });

  if (!userSettings) {
    return next(new AppError('No settings found for this user!', StatusCodes.NOT_FOUND));
  }

  const updatedSettings = await Settings.findByIdAndUpdate(
    userSettings._id,
    {
      resultsPerPage: req.body.resultsPerPage,
      theme: req.body.theme,
      currency: req.body.currency,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    message: 'Your settings have been updated!',
    data: updatedSettings,
  });
});
