const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resultsPerPage: {
    type: Number,
    enum: [10, 20, 50],
    default: 10,
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light',
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP'],
    default: 'USD',
  },
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
