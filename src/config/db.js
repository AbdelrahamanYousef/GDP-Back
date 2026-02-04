const mongoose = require('mongoose');
const { dbURI } = require('./config');

async function connectDB() {
  if (!dbURI) {
    throw new Error('Database URI is not defined');
  }
  try {
    await mongoose.connect(dbURI);
    console.log('Database connected successfully');

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected');
    });
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    throw error;
  }
}

async function closeDB() {
  await mongoose.disconnect();
  console.log('DB disconnected (closeDB)');
}

module.exports = { connectDB, closeDB };
