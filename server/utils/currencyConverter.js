const getExchangeRates = require('../utils/exchangeRateFetcher');
const logger = require('../configs/logger');

exports.convertCryptoPrices = async (cryptoData) => {
  try {
    const { USD_TO_EUR, USD_TO_GBP } = await getExchangeRates();

    return cryptoData.map((crypto) => {
      if (crypto.quote && crypto.quote.USD) {
        const usdQuote = crypto.quote.USD;

        crypto.quote.EUR = {
          price: usdQuote.price * USD_TO_EUR,
          volume_24h: usdQuote.volume_24h * USD_TO_EUR,
          volume_change_24h: usdQuote.volume_change_24h,
          percent_change_1h: usdQuote.percent_change_1h,
          percent_change_24h: usdQuote.percent_change_24h,
          percent_change_7d: usdQuote.percent_change_7d,
          percent_change_30d: usdQuote.percent_change_30d,
          percent_change_60d: usdQuote.percent_change_60d,
          percent_change_90d: usdQuote.percent_change_90d,
          market_cap: usdQuote.market_cap * USD_TO_EUR,
          market_cap_dominance: usdQuote.market_cap_dominance,
          fully_diluted_market_cap: usdQuote.fully_diluted_market_cap * USD_TO_EUR,
        };

        crypto.quote.GBP = {
          price: usdQuote.price * USD_TO_GBP,
          volume_24h: usdQuote.volume_24h * USD_TO_GBP,
          volume_change_24h: usdQuote.volume_change_24h,
          percent_change_1h: usdQuote.percent_change_1h,
          percent_change_24h: usdQuote.percent_change_24h,
          percent_change_7d: usdQuote.percent_change_7d,
          percent_change_30d: usdQuote.percent_change_30d,
          percent_change_60d: usdQuote.percent_change_60d,
          percent_change_90d: usdQuote.percent_change_90d,
          market_cap: usdQuote.market_cap * USD_TO_GBP,
          market_cap_dominance: usdQuote.market_cap_dominance,
          fully_diluted_market_cap: usdQuote.fully_diluted_market_cap * USD_TO_GBP,
        };
      }
      return crypto;
    });
  } catch (error) {
    logger.error('Error converting crypto prices:', error);
  }
};
