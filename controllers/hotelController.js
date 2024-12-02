const bcrypt = require('bcrypt');
const Hotel = require("../models/hotelModel"); // Hotel model
const { generateQRCode } = require("../utils/qrCodeGenerator"); // QR code generator

const registerHotel = async (req, res) => {
  try {
    // Log req.body and req.files to debug
    console.log("req.body:", req.body); // This should contain the form data
    console.log("req.files:", req.files); // This should contain the uploaded files

    // Extract request data
    const { name, email, password, address, phone, description } = req.body;

    // File paths from upload middleware
    const image = req.files?.image?.[0]?.path || null;
    const images = req.files?.images?.map(file => file.path) || [];
    const bannerImage = req.files?.bannerImage?.[0]?.path || null;

    // Step 1: Validate request data
    if (!name || !email || !password || !address || !phone || !description || !image || images.length === 0 || !bannerImage) {
      return res.status(400).json({ message: "All fields are required, including images and bannerImage" });
    }

    // Step 2: Validate email format
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

    // Step 5: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 6: Create a new hotel document
    const hotel = new Hotel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      description,
      image,
      images,
      bannerImage,
    });

    // Step 7: Generate and assign QR code
    hotel.qrCode = await generateQRCode(`https://digital-tipping.vercel.app/hotels/${hotel._id}`);

    // Step 8: Save hotel to the database
    await hotel.save();

    // Step 9: Respond with the hotel data
    return res.status(201).json({
      message: "Hotel registered successfully",
      hotel,
    });
  } catch (error) {
    console.error("Error registering hotel:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

// Get hotel by ID
const getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params; // Get hotelId from the route parameter

    // Validate hotelId
    if (!hotelId) {
      return res.status(400).json({ message: "Hotel ID is required" });
    }

    const hotel = await Hotel.findById(hotelId); // Find hotel by ID

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel); // Return the hotel data (including QR code) in the response
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

// Get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("employees");
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};


module.exports = { registerHotel, getHotelById, getHotels }