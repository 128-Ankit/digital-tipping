const express = require("express");
const { addEmployee, getEmployeesByHotel, getEmployeeById } = require("../controllers/employeeController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, addEmployee);
router.get("/:hotelId", getEmployeesByHotel);
router.get("/employee/:employeeId", getEmployeeById);

module.exports = router;
