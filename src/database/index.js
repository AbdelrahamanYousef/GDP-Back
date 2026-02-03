const mongoose = require("mongoose");
const config = require("../config");

async function connectDB() {
  try {
    await mongoose.connect(config.dbUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
}

module.exports = connectDB;
