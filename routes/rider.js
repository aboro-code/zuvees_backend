const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const isRider = require('../middleware/isRider');

// Rider can view assigned orders (status = Shipped)
router.get('/', isRider, async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Shipped' }).populate('productId');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});

// Rider can update order status (to Delivered)
router.patch('/:id', isRider, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

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
