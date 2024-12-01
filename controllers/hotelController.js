const Hotel = require("../models/hotelModel"); // Hotel model
const { generateQRCode } = require("../utils/qrCodeGenerator"); // QR code generator

const registerHotel = async (req, res) => {
  try {
    const { name, email, password, address, phone, description } = req.body;
    // Step 1: Validate request data
    if (!name || !email || !password || !address || !phone || !description) {
      return res.status(400).json({ message: "All fields (name, email, password) are required" });
    }

    // Step 2: Validate email format (if not already done by Mongoose)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Step 3: Validate password length (min 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Step 4: Check if hotel already exists with the same email
    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel) {
      return res.status(400).json({ message: "Hotel already registered with this email" });
    }

    // Step 5: Create a new hotel document
    const hotel = new Hotel({ name, email, password, address, phone, description });

    // Step 6: Generate and assign QR code
    hotel.qrCode = await generateQRCode(`https://digital-tipping.vercel.app/hotels/${hotel._id}`);

    // Step 7: Save hotel to the database
    await hotel.save();

    // Step 8: Respond with the hotel data
    return res.status(201).json(hotel);
  } catch (error) {
    console.error("Error registering hotel:", error);
    res.status(500).json({ message: error.message });
  }
};


const getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params;  // Get hotelId from the route parameter
    const hotel = await Hotel.findById(hotelId);  // Find hotel by ID
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);  // Return the hotel data (including QR code) in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("employees");
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHotelById, registerHotel, getHotels }
