import express from 'express';

const router = express.Router();

// Hardcoded admin credentials for the decoupled Admin panel
const ADMIN_CREDENTIALS = {
  email: 'admin@stuckfit.com',
  password: 'admin'
};

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    // In a production app, we would sign and return a JWT here
    res.json({
      success: true,
      user: {
        id: 'admin_1',
        name: 'Stuckfit Admin',
        email: email,
        isAdmin: true
      },
      token: 'mock-jwt-token-12345'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

export default router;
