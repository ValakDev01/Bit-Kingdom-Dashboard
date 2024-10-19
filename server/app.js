const express = require('express');
const morgan = require('morgan');

const cryptoRouter = require('./routes/cryptoRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/crypto', cryptoRouter);

module.exports = app;
