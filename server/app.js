const express = require('express');
const morgan = require('morgan');
const { getAllData } = require('./controllers/getAllData');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/api/v1/data', getAllData);

module.exports = app;
