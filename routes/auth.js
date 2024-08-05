// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
require('dotenv').config();

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;

    console.log('Received registration data:', { username, password, phoneNumber });

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { phoneNumber }] });
    if (existingUser) {
      console.log('User already exists:', existingUser);

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(400).json({ message: 'User with the given username or phone number already exists', token });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, password: hashedPassword, phoneNumber });
    await user.save();

    console.log('User saved:', user);

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Sign-in Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Received login data:', { username, password });

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
