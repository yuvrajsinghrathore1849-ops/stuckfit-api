import express from 'express';
import orders from '../data/localOrders.js';

const router = express.Router();

// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', (req, res) => {
  try {
    // Sort orders by most recent date
    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sortedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading orders' });
  }
});

export default router;
