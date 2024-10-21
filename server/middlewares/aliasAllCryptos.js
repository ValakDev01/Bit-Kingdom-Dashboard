exports.aliasAllCryptos = (req, res, next) => {
  req.query.fields = `id, name, symbol, date_added, max_suply, total_supply, 
  infinite_supply, isWatchlisted, quote.USD.price, quote.USD.volume_24h, 
  quote.USD.percent_change_1h, quote.USD.percent_change_24h, quote.USD.percent_change_7d, 
  quote.USD.percent_change_30d, quote.USD.market_cap`;
  next();
};
