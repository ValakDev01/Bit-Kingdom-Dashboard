const { ReasonPhrases } = require('http-status-codes');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')
      ? ReasonPhrases.BAD_REQUEST
      : ReasonPhrases.INTERNAL_SERVER_ERROR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
