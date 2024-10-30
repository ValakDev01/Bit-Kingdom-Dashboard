const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  price: {
    type: Number,
  },
  volume_24h: {
    type: Number,
  },
  volume_change_24h: {
    type: Number,
  },
  percent_change_1h: {
    type: Number,
  },
  percent_change_24h: {
    type: Number,
  },
  percent_change_7d: {
    type: Number,
  },
  percent_change_30d: {
    type: Number,
  },
  percent_change_60d: {
    type: Number,
  },
  percent_change_90d: {
    type: Number,
  },
  market_cap: {
    type: Number,
  },
  market_cap_dominance: {
    type: Number,
  },
  fully_diluted_market_cap: {
    type: Number,
  },
  tvl: {
    type: Number,
    default: null,
  },
  last_updated: {
    type: Date,
  },
});

const cryptoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,

      unique: true,
    },
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
    slug: {
      type: String,
    },
    num_market_pairs: {
      type: Number,
    },
    date_added: {
      type: Date,
    },
    tags: {
      type: [String],
      default: [],
    },
    max_supply: {
      type: Number,
      default: null,
    },
    circulating_supply: {
      type: Number,
    },
    total_supply: {
      type: Number,
    },
    infinite_supply: {
      type: Boolean,
    },
    platform: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    cmc_rank: {
      type: Number,
    },
    self_reported_circulating_supply: {
      type: Number,
      default: null,
    },
    self_reported_market_cap: {
      type: Number,
      default: null,
    },
    tvl_ratio: {
      type: Number,
      default: null,
    },
    last_updated: {
      type: Date,
    },
    percent_change_24h: {
      type: Number,
      default: null,
    },
    quote: {
      USD: quoteSchema,
      EUR: quoteSchema,
      GBP: quoteSchema,
    },
  },
  {
    timestamps: true,
  },
);

cryptoSchema.pre('save', function (next) {
  this.percent_change_24h = this.quote?.USD?.percent_change_24h ?? null;
  next();
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
