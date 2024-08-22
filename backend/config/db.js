const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }
    await mongoose.connect(uri); // Removed deprecated options
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
