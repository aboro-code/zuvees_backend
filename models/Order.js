const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  status: { type: String, default: 'Paid' },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
