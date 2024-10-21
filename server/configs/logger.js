const { createLogger, format, transports, addColors } = require('winston');
const path = require('path');

const colors = {
  info: 'bold inverse green',
  warn: 'bold inverse yellow',
  error: 'bold inverse red',
};

addColors(colors);

const logger = createLogger({
  level: 'info',
  defaultMeta: { service: 'user-service' },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../logs/warn.log'), level: 'warn' }),
    new transports.File({ filename: path.join(__dirname, '../logs/info.log'), level: 'info' }),
    new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
    }),
  ],
});

module.exports = logger;
