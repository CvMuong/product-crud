const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/product-crud');
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('DB connection error', error);
        process.exit(1);
    }
}

module.exports = connectDB;