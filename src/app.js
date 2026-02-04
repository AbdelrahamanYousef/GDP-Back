
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require("./config/config");
const { connectDB, closeDB } = require("./config/db");

const app = express();

// Security + parsing + logging
app.use(helmet());
app.use(cors({ origin: config.corsOrigin || '*' }));
app.use(express.json());
if (config.env !== 'production') app.use(morgan('dev'));

// Basic routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server after DB connection (if configured) and add graceful shutdown
let server;
async function start() {
    try {
        if (config.dbURI) {
            await connectDB();
        }

        server = app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();

async function shutdown(signal) {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    try {
        if (server) {
            await new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) return reject(err);
                    console.log('HTTP server closed.');
                    resolve();
                });
            });
        }

        if (config.dbURI) {
            await closeDB();
        }

        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
}

process.on('SIGTERM', () => { shutdown('SIGTERM'); });
process.on('SIGINT', () => { shutdown('SIGINT'); });
process.on('SIGUSR2', () => { shutdown('SIGUSR2'); });