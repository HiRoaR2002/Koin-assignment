const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = { Crypto };
