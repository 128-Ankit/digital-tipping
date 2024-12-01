const express = require("express");
const { getTipsForEmployee, addTip } = require("../controllers/tipController");

const router = express.Router();

// Get tips for an employee
router.get("/:employeeId", getTipsForEmployee);

// Add a new tip
router.post("/", addTip);

module.exports = router;
