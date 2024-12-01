const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

// Login route for hotels
router.post("/login", login);

module.exports = router;
