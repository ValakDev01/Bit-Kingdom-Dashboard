const express = require('express');

const { signup, login, protect } = require('../controllers/authController');

const { getAllUsers, getOneUser } = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

router.use(protect);

router.route('/').get(getAllUsers);

router.route('/:id').get(getOneUser);

module.exports = router;
