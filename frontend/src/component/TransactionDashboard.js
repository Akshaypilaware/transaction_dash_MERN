import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Select, MenuItem, Card, CardContent, Typography, Box } from '@mui/material';
import { fetchTransactions, fetchStatistics, fetchBarChartStats } from '../component/Api';
import TransactionTable from './TransactionTable';
import BarChart from './BarChart';


const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const TransactionDashboard = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartStats, setBarChartStats] = useState({});
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching transactions for:', { month, search, page, perPage });
        const transactionsData = await fetchTransactions(month, search, page, perPage);
        console.log('Transactions data:', transactionsData);
        setTransactions(transactionsData.transactions);
        setTotal(transactionsData.total);
  
        console.log('Fetching statistics for:', { month });
        const stats = await fetchStatistics(month);
        console.log('Statistics:', stats);
        setStatistics(stats);
  
        console.log('Fetching bar chart stats for:', { month });
        const barChartStatsData = await fetchBarChartStats(month);
        console.log('Bar chart stats data:', barChartStatsData);
        setBarChartStats(barChartStatsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [month, search, page, perPage]);
  
  

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <Container>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{ position: 'sticky', backgroundColor: '#DAF7A6', top: 0 }}
      >
        Transaction Dashboard
      </Typography>
      <Box sx={{ backgroundColor: '#E8F8F5', padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Search transaction"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              value={month}
              onChange={handleMonthChange}
              variant="outlined"
            >
              {months.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Box sx={{ backgroundColor: '#E8F8F5', padding: 2, marginTop: 2 }}>
          <TransactionTable
            transactions={transactions}
            page={page}
            perPage={perPage}
            total={total}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </Box>
      </Box>

      <Box sx={{ backgroundColor: '#FDEDEC', padding: 2, marginTop: 2 }}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Sale Amount</Typography>
                <Typography variant="h4">{statistics.totalSaleAmount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Sold Items</Typography>
                <Typography variant="h4">{statistics.soldItems}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Not Sold Items</Typography>
                <Typography variant="h4">{statistics.notSoldItems}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: '#FEF9E7', padding: 2, marginTop: 2 }}>
        <BarChart data={barChartStats} />
      </Box>
    </Container>
  );
};

export default TransactionDashboard;