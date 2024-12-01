const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bankDetails: {
    type: String,
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true
  }, // Reference to Hotel
});

module.exports = mongoose.model("Employee", employeeSchema);
