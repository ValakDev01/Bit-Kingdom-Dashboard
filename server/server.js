const mongoose = require('mongoose');
const dotenv = require('dotenv');

const logger = require('./config/logger');
const validateEnv = require('./config/validateEnv');

require('./utils/cronJob');

dotenv.config({ path: './.env' });

const env = validateEnv();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
  logger.info('MongoDB connection established!');
});

const app = require('./app');

const port = env.PORT;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
