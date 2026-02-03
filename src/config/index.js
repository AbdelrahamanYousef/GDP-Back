require("dotenv").config()

const config = {
    port :Number(process.env.PORT) |3000,
    env: process.env.NODE_ENV || 'development',
    dbURI : process.env.DVURI
}

module.exports = config;
