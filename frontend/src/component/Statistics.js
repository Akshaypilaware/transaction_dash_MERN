import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../component/Api';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStatistics(month);
        setStats(data || {});
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    loadStats();
  }, [month]);

  return (
    <div>
      <h3>Statistics for {month}</h3>
      <p>Total Sale Amount: {stats.totalSaleAmount || 'N/A'}</p>
      <p>Total Sold Items: {stats.soldItems || 'N/A'}</p>
      <p>Total Not Sold Items: {stats.notSoldItems || 'N/A'}</p>
    </div>
  );
};

export default Statistics;
