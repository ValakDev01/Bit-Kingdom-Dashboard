const axios = require('axios');

const logger = require('../configs/logger');

const getExchangeRates = async () => {
  try {
    const response = await axios.get(
      `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`,
      {
        params: {
          symbols: 'EUR,GBP',
        },
      },
    );

    const rates = response.data.conversion_rates;

    logger.info('Exchange rates fetched successfully!');

    return {
      USD_TO_EUR: rates.EUR,
      USD_TO_GBP: rates.GBP,
    };
  } catch (error) {
    logger.error('Error fetching exchange rates:', error);
  }
};

module.exports = getExchangeRates;
