const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Hotel = require("../models/hotelModel");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the hotel by email
        const hotel = await Hotel.findOne({ email });
        if (!hotel) {
            return res.status(400).json({ message: "Hotel not found" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, hotel.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ hotelId: hotel._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Send the hotel ID and token to the client
        res.status(200).json({ message: "Login successful", token, hotelId: hotel._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login };
