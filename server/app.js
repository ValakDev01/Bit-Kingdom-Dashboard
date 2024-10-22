const express = require('express');
const morgan = require('morgan');
const { StatusCodes } = require('http-status-codes');

const cryptoRouter = require('./routes/cryptoRoutes');
const watchlistRouter = require('./routes/watchlistRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/crypto', cryptoRouter);
app.use('/api/v1/watchlist', watchlistRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page not found!', StatusCodes.NOT_FOUND));
});

app.use(globalErrorHandler);

module.exports = app;
