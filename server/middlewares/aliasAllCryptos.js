exports.aliasAllCryptos = (req, res, next) => {
  req.query.fields = `id, name, symbol, date_added, max_suply, total_supply,
  infinite_supply, cmc_rank, quote.USD.price, quote.USD.volume_24h,
  quote.USD.percent_change_1h, quote.USD.percent_change_24h, quote.USD.percent_change_7d,
  quote.USD.percent_change_30d, quote.USD.market_cap, quote.EUR.price, quote.EUR.volume_24h,
  quote.EUR.percent_change_1h, quote.EUR.percent_change_24h, quote.EUR.percent_change_7d,
  quote.EUR.percent_change_30d, quote.EUR.market_cap, quote.GBP.price, quote.GBP.volume_24h,
  quote.GBP.percent_change_1h, quote.GBP.percent_change_24h, quote.GBP.percent_change_7d,
  quote.GBP.percent_change_30d, quote.GBP.market_cap`;
  next();
};
