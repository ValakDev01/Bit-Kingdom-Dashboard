const dotenv = require('dotenv');
const axios = require('axios');

const logger = require('../configs/logger');
const Crypto = require('../models/cryptoModel');

dotenv.config({ path: '../.env' });

const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
        },
      },
    );

    const cryptos = response.data.data;

    await Crypto.deleteMany();
    await Crypto.create(cryptos);

    logger.info('Data successfully fetched and saved to the database!');
  } catch (err) {
    logger.error('Error fetching data from API! ' + err);
  }
};

module.exports = fetchDataFromAPI;
