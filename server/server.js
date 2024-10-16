const dotenv = require('dotenv');
const logger = require('./config/logger');
const validateEnv = require('./config/validateEnv');

dotenv.config({ path: './.env' });

const env = validateEnv();

const app = require('./app');

const port = env.PORT;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
