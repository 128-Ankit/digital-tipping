const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hotel name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  qrCode: {
    type: String,
  },
  employees: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
});

// Pre-save hook to hash the password
hotelSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
  }
  next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
