// models/Business.js
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  details: {
    name: String,
    description: String,
    address: String,
  },
  contactDetails: {
    email: String,
    phone: String,
  },
  category: String,
  timings: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
  pictures: [String], // Array of picture URLs
}, { collection: 'businesses' });

const Business = mongoose.model('Business', businessSchema, 'businesses');

module.exports = Business;
