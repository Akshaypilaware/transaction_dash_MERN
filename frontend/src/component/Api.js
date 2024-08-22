import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTransactions = async (month, search = '', page = 1, perPage = 10) => {
  try {
    console.log('Requesting transactions with params:', { month, search, page, perPage });
    const response = await axios.get(`${API_URL}/transactions`, {
      params: { month, search, page, perPage },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; 
  }
};

export const fetchStatistics = async (month) => {
  try {
    console.log('Requesting statistics with params:', { month });
    const response = await axios.get(`${API_URL}/statistics`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error; 
  }
};

export const fetchBarChartStats = async (month) => {
  try {
    console.log('Requesting bar chart stats with params:', { month });
    const response = await axios.get(`${API_URL}/bar-chart-stats`, {
      params: { month },
    });
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching bar chart stats:', error);
    throw error; 
  }
};
