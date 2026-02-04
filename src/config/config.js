const dotenv = require('dotenv');

// Load .env into process.env if present
dotenv.config();

const getEnv = (key, fallback) => process.env[key] || fallback;

const port = Number(getEnv('PORT', 3000));
const env = getEnv('NODE_ENV', 'development');
const dbURI = getEnv('DBURI');

// In production we require DBURI to be set
if (!dbURI && env === 'production') {
    console.error('Missing required DBURI environment variable');
    process.exit(1);
}

module.exports = {
    port,
    env,
    dbURI,
    corsOrigin: getEnv('CORS_ORIGIN', '*'),
};
