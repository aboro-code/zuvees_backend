const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Auth check middleware
const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('productId');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});

// Create new order
router.post('/', isAuthenticated, async (req, res) => {
  const { productId, customerName, size, color } = req.body;
  const status = req.body.status || 'Paid';

  if (!productId || !customerName || !size || !color) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newOrder = new Order({ productId, customerName, size, color, status });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
});

module.exports = router;
