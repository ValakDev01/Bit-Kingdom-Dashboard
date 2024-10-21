const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const User = require('../models/userMode');
const logger = require('../configs/logger');

dotenv.config({ path: path.join(__dirname, '../.env') });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
  logger.info('MongoDB connection established!');
});

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${path.join(__dirname, '../data/users.json')}`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });

    logger.info('Data successfully loaded!');
  } catch (err) {
    logger.error(err.message);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();

    logger.info('Data successfully deleted!');
  } catch (err) {
    logger.error(err.message);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
