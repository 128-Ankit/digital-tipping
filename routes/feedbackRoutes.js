const express = require("express");
const { submitFeedback, getFeedbackForHotel } = require("../controllers/feedbackController");
const router = express.Router();

// Route to submit feedback for a specific hotel
router.post("/feedback/:hotelId", submitFeedback);

// Route to get all feedback for a specific hotel
router.get("/feedback/:hotelId", getFeedbackForHotel);

module.exports = router;
