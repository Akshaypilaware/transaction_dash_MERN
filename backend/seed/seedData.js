require('dotenv').config(); 
const axios = require('axios');
const connectDB = require('../config/db'); 
const Transaction = require('../models/Transaction'); 
console.log('dotenv.config() was called'); 
console.log('MongoDB URI:', process.env.MONGO_URI); 

const seedDatabase = async () => {
  console.log('Connecting to database...'); 
  try {
    await connectDB(); // Connect to the database

    console.log('Database connected successfully'); 

    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
     
    data.forEach(item => {
      item.dateOfSale = new Date(item.dateOfSale);
    }); 
    
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding the database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
