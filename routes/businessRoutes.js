// // routes/businessRoutes.js
// const express = require('express');
// const Business = require('../models/Business');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// // Middleware to authenticate the user
// router.use(authMiddleware);

// // Create Business
// router.post('/create', async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const {
//       name,
//       description,
//       address,
//       email,
//       phone,
//       category,
//       timings,
//       pictures
//     } = req.body;

//     // Find user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Create new business
//     const business = new Business({
//       owner: userId,
//       details: { name, description, address },
//       contactDetails: { email, phone },
//       category,
//       timings,
//       pictures
//     });

//     await business.save();

//     // Add business to user's list
//     user.businesses.push(business._id);
//     await user.save();

//     res.status(201).json({ message: 'Business created successfully', business });
//   } catch (error) {
//     console.error('Error creating business:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Get all businesses (for listing)
// router.get('/list', async (req, res) => {
//   try {
//     const businesses = await Business.find().populate('owner', 'username');
//     res.json(businesses);
//   } catch (error) {
//     console.error('Error fetching businesses:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// module.exports = router;

// routes/businessRoutes.js
const express = require('express');
const Business = require('../models/Business');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes in this file
router.use(authMiddleware);

// Create Business
router.post('/create', async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      name,
      description,
      address,
      email,
      phone,
      category,
      timings,
      pictures
    } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new business
    const business = new Business({
      owner: userId,
      details: { name, description, address },
      contactDetails: { email, phone },
      category,
      timings,
      pictures
    });

    await business.save();

    // Add business to user's list
    user.businesses.push(business._id);
    await user.save();

    res.status(201).json({ message: 'Business created successfully', business });
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/userlist', async (req, res) => {
  try {
    const { userId } = req.user;

    // Find businesses owned by the authenticated user
    const businesses = await Business.find({ owner: userId });
    
    res.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all businesses (for listing)
router.get('/list', async (req, res) => {
  try {
    const businesses = await Business.find().populate('owner', 'username');
    res.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
