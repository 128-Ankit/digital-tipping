const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
 
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, // Force IPv4 to resolve DNS issues
    });

    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("Failed to connect DB:");
    console.error(`Error Message: ${error.message}`);
    console.error("Full Error Object:", error);

    // Graceful exit
    process.exit(1);
  }
};

module.exports = connectDB;
