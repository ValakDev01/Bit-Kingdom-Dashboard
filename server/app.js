const express = require('express');
const morgan = require('morgan');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const cryptoRouter = require('./routes/cryptoRoutes');
const watchlistRouter = require('./routes/watchlistRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      status: ReasonPhrases.TOO_MANY_REQUESTS,
      message: 'Too many requests from this IP, please try again in 15 minutes!',
    });
  },
});

app.use('/api', limiter);

app.use(helmet());

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(compression());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/crypto', cryptoRouter);
app.use('/api/v1/watchlist', watchlistRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page not found!', StatusCodes.NOT_FOUND));
});

app.use(globalErrorHandler);

module.exports = app;
