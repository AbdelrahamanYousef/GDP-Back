
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require("./config/index")
const connectDB  = require("./database/index")

const app = express();


// Middleware
app.use(bodyParser.json());

// MongoDB connection
connectDB();
// Start the server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});