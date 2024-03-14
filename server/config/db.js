const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
  try {
    const dbUrl = process.env.DB_URL;
    await mongoose.connect(dbUrl);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDatabase();