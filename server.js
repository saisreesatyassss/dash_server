
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const bodyParser = require('body-parser');
// // require('dotenv').config();

// // const app = express();
// // const port = 3000;

// // app.use(bodyParser.json());

// // // MongoDB Connection
// // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => console.log('MongoDB connection error:', err));

// // // User Schema and Model
// // const userSchema = new mongoose.Schema({
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   phoneNumber: { type: String, required: true, unique: true }
// // }, { collection: 'users' }); // Specify the collection name here

// // const User = mongoose.model('User', userSchema, 'users'); // Ensure the collection name is 'users'

// // // Registration Route
// // app.post('/register', async (req, res) => {
// //   try {
// //     const { username, password, phoneNumber } = req.body;

// //     console.log('Received registration data:', { username, password, phoneNumber });

// //     // Check if user already exists
// //     const existingUser = await User.findOne({ $or: [{ username }, { phoneNumber }] });
// //     if (existingUser) {
// //       console.log('User already exists:', existingUser);
// //       return res.status(400).json({ message: 'User with the given username or phone number already exists' });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create new user
// //     const user = new User({ username, password: hashedPassword, phoneNumber });
// //     await user.save();

// //     console.log('User saved:', user);

// //     // Generate JWT
// //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// //     res.status(201).json({ message: 'User registered successfully', token });
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // });

// // // Sign-in Route
// // app.post('/login', async (req, res) => {
// //   try {
// //     const { username, password } = req.body;

// //     console.log('Received login data:', { username, password });

// //     // Find user
// //     const user = await User.findOne({ username });
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     // Check password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     // Generate JWT
// //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// //     res.json({ token });
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server running on http://localhost:${port}`);
// // });

              

              
// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // Routes
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




              
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const userInfoRoutes = require('./routes/userInfo');
const businessRoutes = require('./routes/businessRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userInfoRoutes);
app.use('/api/business', businessRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
