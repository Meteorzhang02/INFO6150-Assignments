const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Create user endpoint (enhanced with type field)
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    // Validate type
    if (!['admin', 'employee'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either admin or employee' });
    }

    const user = new User({ name, email, password, type });
    await user.save();

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (without passwords)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;