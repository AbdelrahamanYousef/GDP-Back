const mongoose = require('mongoose');
const { dbURI } = require('./config');
const logger = require('./logger');

async function connectDB() {
  if (!dbURI) {
    throw new Error('Database URI is not defined');
  }

  try {
    await mongoose.connect(dbURI);
    logger.info('Database connected successfully');

    mongoose.connection.on('error', (err) => {
      logger.error(`Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.info('Database disconnected');
    });
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    throw error;
  }
}

async function closeDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, closeDB };
