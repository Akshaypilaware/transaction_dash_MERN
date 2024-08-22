const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes'); 
const transactionController = require('./Controllers/transactionController'); 

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); 

// Connect to MongoDB
connectDB();


// Use transactionRoutes for all routes starting with /api
app.use('/api', transactionRoutes);

// Define the seed route
app.post('/api/seed', transactionController.seedDatabase);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Handle other errors (optional, but useful for debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.get('/api/transactions', (req, res) => {

  res.json({ transactions: [], total: 0, page: 1, perPage: 10 }); // Example response
});

app.get('/api/statistics', (req, res) => {

  res.json({ totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 }); // Example response
});

app.get('/api/bar-chart-stats', (req, res) => {

  res.json({ "0-100": 0, "101-200": 0, /* other ranges */ }); // Example response
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
