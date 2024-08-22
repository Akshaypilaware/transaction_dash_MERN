const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  sold: { type: Boolean, required: true },
  dateOfSale: { type: Date, required: true },
  image: { type: String },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
