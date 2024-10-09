// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const schedule = require('node-schedule');
const { Crypto } = require('./models');


const app = express();
const PORT = process.env.PORT;

// MongoDB connection (Replace with your connection string)
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to fetch and store cryptocurrency data
const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  for (const coin of coins) {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
      const data = await response.json();

      const cryptoData = {
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      };

      // Save data to MongoDB
      await Crypto.create(cryptoData);
      console.log(`Saved data for ${coin}:`, cryptoData);
    } catch (error) {
      console.error(`Error fetching data for ${coin}:`, error);
    }
  }
};

// Schedule the job to run every 2 hours
schedule.scheduleJob('0 */2 * * *', fetchCryptoData);

// API to get the latest data about a cryptocurrency
app.get('/stats', async (req, res) => {
  const { coin } = req.query;
  console.log('Requested coin:', coin);
  try {
    const data = await Crypto.findOne({ coin }).sort({ createdAt: -1 }).exec();
    if (!data) {
      return res.status(404).json({ error: 'Coin not found' });
    }

    res.json({
      price: data.price,
      marketCap: data.marketCap,
      "24hChange": data.change24h
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API to get the standard deviation of prices
const calculateStandardDeviation = (values) => {
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  return Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);
};

app.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  try {
    const records = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100).exec();
    if (records.length === 0) {
      return res.status(404).json({ error: 'No records found for this coin' });
    }

    const prices = records.map(record => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
