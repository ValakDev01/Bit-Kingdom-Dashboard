const mongoose = require('mongoose');
const dotenv = require('dotenv');

const logger = require('./configs/logger');
const validateEnv = require('./configs/validateEnv');

require('./utils/cronJob');

process.on('uncaughtException', (err) => {
  logger.info('UNCAUGHT EXCEPTION! Shutting down...');
  logger.info(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

const env = validateEnv();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
  logger.info('MongoDB connection established!');
});

const app = require('./app');

const port = env.PORT;

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  logger.info('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.info(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
