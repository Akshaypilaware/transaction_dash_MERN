const Transaction = require('../models/Transaction');
const axios = require('axios');

// Utility to get the start and end dates for a given month and year
const getMonthRange = (month) => {
    const startOfMonth = new Date(`2023-${month}- 01`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
};

// Fetch transactions with search and pagination
const fetchTransactions = async (month, search = '', page = 1, perPage = 10) => {
    const { startOfMonth, endOfMonth } = getMonthRange(month);

    const query = {
        dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
    };

    if (search) {
        if (!isNaN(search)) {
            query.price = Number(search);
        } else {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { category: new RegExp(search, 'i') }
            ];
        }
    }

    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));
    const total = await Transaction.countDocuments(query);

    return { transactions, total, page: parseInt(page), perPage: parseInt(perPage) };
};

// Fetch statistics for the selected month
const fetchStatistics = async (month) => {
    const { startOfMonth, endOfMonth } = getMonthRange(month);

    const transactions = await Transaction.find({
        dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
    });

    const totalSaleAmount = transactions.reduce((sum, item) => sum + item.price, 0);
    const soldItems = transactions.filter(item => item.sold).length;
    const notSoldItems = transactions.length - soldItems;

    return { totalSaleAmount, soldItems, notSoldItems };
};

// Fetch bar chart data
const fetchBarChartStats = async (month) => {
    const { startOfMonth, endOfMonth } = getMonthRange(month);

    const transactions = await Transaction.find({
        dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
    });

    const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0,
    };

    transactions.forEach(transaction => {
        if (transaction.price <= 100) priceRanges['0-100']++;
        else if (transaction.price <= 200) priceRanges['101-200']++;
        else if (transaction.price <= 300) priceRanges['201-300']++;
        else if (transaction.price <= 400) priceRanges['301-400']++;
        else if (transaction.price <= 500) priceRanges['401-500']++;
        else if (transaction.price <= 600) priceRanges['501-600']++;
        else if (transaction.price <= 700) priceRanges['601-700']++;
        else if (transaction.price <= 800) priceRanges['701-800']++;
        else if (transaction.price <= 900) priceRanges['801-900']++;
        else priceRanges['901-above']++;
    });

    return priceRanges;
};

// Fetch pie chart data
const fetchPieChartStats = async (month) => {
    const { startOfMonth, endOfMonth } = getMonthRange(month);

    const transactions = await Transaction.find({
        dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
    });

    const categoryCounts = transactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + 1;
        return acc;
    }, {});

    return categoryCounts;
};

// Controller Functions

const seedDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ message: 'Failed to initialize database' });
    }
};

const getTransactions = async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month parameter is required' });
    }

    try {
        const result = await fetchTransactions(month, search, page, perPage);
        res.json(result);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getStatistics = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month parameter is required' });
    }

    try {
        const stats = await fetchStatistics(month);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getBarChartStats = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month parameter is required' });
    }

    try {
        const data = await fetchBarChartStats(month);
        res.json({ data });
    } catch (error) {
        console.error('Error fetching bar chart stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPieChartStats = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month parameter is required' });
    }

    try {
        const data = await fetchPieChartStats(month);
        res.json(data);
    } catch (error) {
        console.error('Error fetching pie chart stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCombinedData = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month parameter is required' });
    }

    try {
        const [transactions, statistics, barChartStats, pieChartStats] = await Promise.all([
            fetchTransactions(month),
            fetchStatistics(month),
            fetchBarChartStats(month),
            fetchPieChartStats(month)
        ]);

        res.json({
            transactions: transactions.transactions,
            total: transactions.total,
            page: transactions.page,
            perPage: transactions.perPage,
            statistics,
            barChartStats,
            pieChartStats
        });
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export functions
module.exports = {
    seedDatabase,
    getTransactions,
    getStatistics,
    getBarChartStats,
    getPieChartStats,
    getCombinedData
};