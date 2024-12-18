const mongoose = require('mongoose');

// Define the schema for user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    images: [{ type: String }],  
    bannerImage: { type: String },  
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model to be used elsewhere
module.exports = User;