const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",  // Reference to the Hotel model
        required: true,
    },
    user: {
        type: String,  // You can replace this with a user reference if you're using authentication
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
