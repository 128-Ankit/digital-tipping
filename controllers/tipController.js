const Tip = require("../models/tipModel");

// Get all tips for a specific employee
const getTipsForEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const tips = await Tip.find({ employee: employeeId })
      .populate("employee", "name");

    res.status(200).json({ success: true, tips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Submit a tip for an employee
const addTip = async (req, res) => {
  try {
    const { employeeId, amount, comment } = req.body;

    // Validate if employeeId is provided
    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Employee ID is required." });
    }

    // Validate if the amount is greater than zero
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be greater than zero" });
    }

    // Create the new tip
    const newTip = new Tip({
      employee: employeeId,
      amount,
      comment,
    });

    const savedTip = await newTip.save();
    res.status(201).json({ success: true, tip: savedTip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTipsForEmployee, addTip }
