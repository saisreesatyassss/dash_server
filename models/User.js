// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String, required: true, unique: true }
// }, { collection: 'users' }); // Specify the collection name here

// const User = mongoose.model('User', userSchema, 'users'); // Ensure the collection name is 'users'

// module.exports = User;
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  basicInformation: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
  },
  contactInformation: {
    email: String,
    address: String,
    phone: String,
  },
  businessInformation: {
    companyName: String,
    position: String,
    businessType: String,
  },
    businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }] // Reference to Business model

}, { collection: 'users' }); // Specify the collection name here

const User = mongoose.model('User', userSchema, 'users'); // Ensure the collection name is 'users'

module.exports = User;
