// routes/rider.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Rider can view assigned orders (status: 'Shipped')
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Shipped' }).populate('productId');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});

// Rider can update order status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if the new status is valid (could be extended for other status values)
    if (status !== 'Delivered' && status !== 'Shipped') {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

module.exports = router;
