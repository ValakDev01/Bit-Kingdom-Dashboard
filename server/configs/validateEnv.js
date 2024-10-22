const { cleanEnv, port, str } = require('envalid');

const validateEnv = () => {
  return cleanEnv(process.env, {
    PORT: port({
      default: 8000,
      desc: 'The port on which the application runs',
    }),
    NODE_ENV: str({
      choices: ['development', 'production', 'test'],
      desc: 'The environment in which the application is running',
    }),
    DATABASE: str({
      desc: 'The MongoDB connection string',
    }),
    DATABASE_PASSWORD: str({
      desc: 'The password for the MongoDB connection',
    }),
    CMC_API_KEY: str({
      desc: 'The API key for CoinMarketCap',
    }),
    JWT_SECRET: str({
      desc: 'The secret key for signing JWT tokens',
    }),
    JWT_EXPIRES_IN: str({
      default: '30d',
      desc: 'The expiry duration for JWT tokens',
    }),
  });
};

module.exports = validateEnv;
