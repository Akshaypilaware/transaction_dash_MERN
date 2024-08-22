const express = require('express');
const router = express.Router();
const transactionController = require('../Controllers/transactionController');

// Define routes
router.post('/seed', transactionController.seedDatabase);
router.get('/transactions', transactionController.getTransactions);
router.get('/statistics', transactionController.getStatistics);
router.get('/bar-chart-stats', transactionController.getBarChartStats);
router.get('/pie-chart-stats', transactionController.getPieChartStats);
router.get('/combined-data', transactionController.getCombinedData);

// Export router
module.exports = router;
