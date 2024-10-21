const cron = require('node-cron');

const fetchDataFromAPI = require('../utils/cryptoDataFetcher');
const logger = require('../configs/logger');

cron.schedule('0 */12 * * *', async () => {
  try {
    await fetchDataFromAPI();
    logger.info('Data fetched and stored in the database!');
  } catch (err) {
    logger.error('Error fetching data from API in cron job: ' + err);
  }
});
