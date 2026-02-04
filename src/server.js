const config = require("./config/config");
const logger = require("./config/logger");
const { connectDB, closeDB } = require("./config/db");
const app = require("./app");

// Start server after DB connection (if configured) and add graceful shutdown
let server;
async function start() {
  try {
    if (config.dbURI) {
      await connectDB();
    }

    server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

async function shutdown(signal) {
  logger.warn(`Received ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) return reject(err);
          logger.info("HTTP server closed.");
          resolve();
        });
      });
    }

    if (config.dbURI) {
      await closeDB();
    }

    process.exit(0);
  } catch (err) {
    logger.error("Error during shutdown:", err);
    process.exit(1);
  }
}

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});
process.on("SIGINT", () => {
  shutdown("SIGINT");
});
process.on("SIGUSR2", () => {
  shutdown("SIGUSR2");
});
