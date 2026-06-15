import express from 'express';
import users from '../data/localUsers.js';

const router = express.Router();

// @desc    Fetch all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading users' });
  }
});

// @desc    Sync / Create / Update user profile from Store logins and updates
// @route   POST /api/users/sync
// @access  Public
router.post('/sync', (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex !== -1) {
      // Update existing user name (keep role, joinDate, and status)
      users[userIndex].name = name || users[userIndex].name;
      res.json({ success: true, user: users[userIndex] });
    } else {
      // Create new user
      const newUser = {
        id: 'u' + (users.length + 1),
        name: name || email.split('@')[0],
        email: email,
        role: 'Customer',
        joinDate: new Date().toISOString(),
        status: 'Active'
      };
      users.push(newUser);
      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ message: 'Server Error syncing user' });
  }
});

export default router;
