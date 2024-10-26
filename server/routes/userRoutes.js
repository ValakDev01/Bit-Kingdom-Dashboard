const express = require('express');

const {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyEmail,
} = require('../controllers/authController');

const {
  getAllUsers,
  getOneUser,
  updateMe,
  deleteMe,
  getMe,
  updateSettings,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(uploadUserPhoto, resizeUserPhoto, signup);
router.route('/login').post(login);

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/verifyEmail/:token').get(verifyEmail);

router.use(protect);

router.route('/logout').get(logout);
router.route('/myAccount').get(getMe);
router.route('/updateMyPassword').patch(updatePassword);
router.route('/updateMyAccount').patch(uploadUserPhoto, resizeUserPhoto, updateMe);
router.route('/deleteMyAccount').delete(deleteMe);
router.route('/updateMySettings').patch(updateSettings);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);

router.route('/:id').get(getOneUser);

module.exports = router;
