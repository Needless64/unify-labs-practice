const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      items,
      subtotal,
      shipping,
      tax,
      totalAmount
    } = req.body;

    // Validation
    if (!customerName || !email || !phone || !addressLine1 || !city || !state || !zipCode || !country) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item'
      });
    }

    const order = await Order.create({
      customerName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      items,
      subtotal,
      shipping,
      tax,
      totalAmount
    });
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/orders/:id - Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/orders - Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const { status, email } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    if (email) filters.email = email;

    const orders = await Order.findAll(filters);
    
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PATCH /api/orders/:id/status - Update order status (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = await Order.updateStatus(id, status);
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/orders/customer/:email - Get orders by customer email
router.get('/customer/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.findByEmail(email);
    
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
