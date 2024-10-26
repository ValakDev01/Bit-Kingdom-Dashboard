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
    JWT_COOKIE_EXPIRES_IN: str({
      default: '30',
      desc: 'The expiry duration for JWT cookies in days',
    }),
    EMAIL_USERNAME: str({
      desc: 'The username for the email service (e.g., Mailtrap)',
    }),
    EMAIL_PASSWORD: str({
      desc: 'The password for the email service (e.g., Mailtrap)',
    }),
    EMAIL_HOST: str({
      desc: 'The host for the email service',
    }),
    EMAIL_PORT: str({
      desc: 'The port for the email service',
    }),
    EMAIL_FROM: str({
      desc: 'The email address used as the sender for outgoing emails',
    }),
    SENDGRID_USERNAME: str({
      default: 'apikey',
      desc: 'The username for SendGrid (typically "apikey" for API key authentication)',
    }),
    SENDGRID_PASSWORD: str({
      desc: 'The password or API key for SendGrid',
    }),
    SENDGRID_PORT: str({
      default: '587',
      desc: 'The port for connecting to SendGrid',
    }),
    EXCHANGE_RATE_API_KEY: str({
      desc: 'The API key for ExchangeRate-API',
    }),
    EXCHANGE_RATE_API_URL: str({
      desc: 'The URL key for ExchangeRate-API',
    }),
  });
};

module.exports = validateEnv;
