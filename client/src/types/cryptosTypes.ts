interface CurrencyQuote {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  market_cap: number;
}

interface Quote {
  USD: CurrencyQuote;
  EUR: CurrencyQuote;
  GBP: CurrencyQuote;
}

export interface Crypto {
  _id: string;
  id: number;
  name: string;
  symbol: string;
  date_added: string;
  total_supply: number;
  infinite_supply: boolean;
  cmc_rank: number;
  quote: Quote;
}

export type CryptoArray = Crypto[];
