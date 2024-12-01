const express = require("express");
const { registerHotel, getHotels, getHotelById } = require("../controllers/hotelController");

const router = express.Router();

router.post("/register", registerHotel);
router.get("/", getHotels);
router.get("/:hotelId", getHotelById);

module.exports = router;
