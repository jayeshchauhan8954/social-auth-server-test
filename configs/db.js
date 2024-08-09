const mongoose = require('mongoose');
const {MONGO_URL} = require('./config')
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
