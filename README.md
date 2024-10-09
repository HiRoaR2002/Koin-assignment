# Cryptocurrency Stats Application

This is a Node.js application that fetches and stores cryptocurrency data (Bitcoin, Matic, and Ethereum) from the CoinGecko API. The application provides endpoints to retrieve the latest cryptocurrency stats and calculate the standard deviation of prices from stored records.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)

## Features

- Fetches cryptocurrency data every 2 hours and stores it in MongoDB.
- Provides an API endpoint to retrieve the latest data for a specific cryptocurrency.
- Calculates the standard deviation of the last 100 price records for a cryptocurrency.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store cryptocurrency data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Node-fetch**: Lightweight module for making HTTP requests.
- **Node-schedule**: Library for scheduling jobs in Node.js.

## Setup Instructions

### Prerequisites

1. [Node.js](https://nodejs.org/) installed on your machine.
2. [MongoDB Atlas](https://www.mongodb.com/atlas/database) account or a local MongoDB installation.
3. [Git](https://git-scm.com/downloads) for version control.

### Cloning the Repository

```bash
git clone https://github.com/yourusername/crypto-stats.git
cd crypto-stats

