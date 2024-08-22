
import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ data }) => {
  const chartData = Object.keys(data).map((key) => ({
    range: key,
    count: data[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={300} style={{ marginTop: '20px' }}>
      <ReBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
