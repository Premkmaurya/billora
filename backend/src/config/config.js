const dotenv = require("dotenv");

dotenv.config();

const _config = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
};

module.exports = _config;