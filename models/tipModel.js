const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
  amount: {
    type: Number,
    required: [true, "Tip amount is required"],
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically store the tip submission date
  },
});

const Tip = mongoose.model("Tip", tipSchema);

module.exports = Tip;
