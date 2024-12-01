const Feedback = require("../models/feedbackModel");
const Hotel = require("../models/hotelModel");  // To verify if the hotel exists

// Submit feedback for a specific hotel
const submitFeedback = async (req, res) => {
    const { hotelId } = req.params;
    const { user, rating, comment } = req.body;

    try {
        // Check if the hotel exists
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Create a new feedback entry
        const feedback = new Feedback({
            hotel: hotelId,
            user,
            rating,
            comment,
        });

        // Save the feedback to the database
        await feedback.save();

        // Return success response
        res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get all feedback for a specific hotel
const getFeedbackForHotel = async (req, res) => {
    const { hotelId } = req.params;

    try {
        // Fetch all feedback for the specified hotel
        const feedbacks = await Feedback.find({ hotel: hotelId });

        if (feedbacks.length === 0) {
            return res.status(404).json({ message: "No feedback available for this hotel" });
        }

        // Return the feedbacks
        res.status(200).json({ feedbacks });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitFeedback, getFeedbackForHotel }