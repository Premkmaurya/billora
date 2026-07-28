const mongoose = require('mongoose');
const config = require('../config/config');
const migrateCategoryIndexes = require('./migrateIndexes');

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('MongoDB connected');
        await migrateCategoryIndexes();
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;