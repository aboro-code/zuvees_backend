const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Admin authorization middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).send('Permission denied: Admin access required');
};

// Admin dashboard check
router.get('/dashboard', isAdmin, (req, res) => {
  res.json({ message: 'Welcome, admin!', user: req.user });
});

// View all orders
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('productId');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update order status
router.patch('/orders/:id', isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');

    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
