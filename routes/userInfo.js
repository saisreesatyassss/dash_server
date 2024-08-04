// routes/userInfo.js
const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

// Middleware to authenticate the user
router.use(authMiddleware);

// Update Basic Information
router.post('/basic-info', async (req, res) => {
  try {
    const { userId } = req.user;
    const { firstName, lastName, dateOfBirth } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.basicInformation = { firstName, lastName, dateOfBirth };
    await user.save();

    res.json({ message: 'Basic information updated successfully' });
  } catch (error) {
    console.error('Error updating basic information:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update Contact Information
router.post('/contact-info', async (req, res) => {
  try {
    const { userId } = req.user;
    const { email, address, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.contactInformation = { email, address, phone };
    await user.save();

    res.json({ message: 'Contact information updated successfully' });
  } catch (error) {
    console.error('Error updating contact information:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update Business Information
router.post('/business-info', async (req, res) => {
  try {
    const { userId } = req.user;
    const { companyName, position, businessType } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.businessInformation = { companyName, position, businessType };
    await user.save();

    res.json({ message: 'Business information updated successfully' });
  } catch (error) {
    console.error('Error updating business information:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
