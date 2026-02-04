const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const compression = require('compression');
const morgan = require("./config/morgan");
const config = require("./config/config");
const { status } = require('http-status');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();


// if (config.env !== "production") {
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
// }


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors({ origin: config.corsOrigin || "*" }));


// Basic routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 404 handler
app.use((req, res) => {
  res.status(status.NOT_FOUND).send({ code: status.NOT_FOUND, message: "Not found" });
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;