
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TransactionTable = ({ transactions, page, perPage, total, onNextPage, onPrevPage }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop:'20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sold</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.price}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <img src={transaction.image} alt={transaction.title} width="50" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Button onClick={onPrevPage} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {Math.ceil(total / perPage)}
        </span>
        <Button onClick={onNextPage} disabled={page * perPage >= total}>
          Next
        </Button>
      </div>
    </TableContainer>
  );
};

export default TransactionTable;
