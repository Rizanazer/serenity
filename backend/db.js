// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const url = 'mongodb://localhost:27017/serenity';
    await mongoose.connect(url);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
