const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
const dotenv = require("dotenv");

const hotelRoutes = require("./routes/hotelRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const tipRoutes = require("./routes/tipRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// API Routes
app.use("/api/hotels", hotelRoutes);
app.use("/api", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api", feedbackRoutes);


// Error Middleware
app.use(errorHandler);

module.exports = app;
