require("dotenv").config()

const config = {
    port :Number(process.env.PORT) |3000,
    env: process.env.NODE_ENV || 'development',
    dbUrl :"mongodb+srv://myDb:12345678abdo@cluster0.r13zie2.mongodb.net/"
}

module.exports = config;
