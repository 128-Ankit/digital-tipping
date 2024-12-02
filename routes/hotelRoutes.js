const express = require('express');
const { registerHotel, getHotelById, getHotels } = require('../controllers/hotelController');
const upload = require('../config/multer'); // File upload middleware

const router = express.Router();

// Hotel registration route
router.post(
    '/register',
    upload.fields([
        { name: 'images', maxCount: 5 },
        { name: 'image', maxCount: 1 },
        { name: 'bannerImage', maxCount: 1 }
    ]),
    registerHotel
);

// Get hotel by ID
router.get('/:hotelId', getHotelById);

// Get all hotels
router.get('/', getHotels);

module.exports = router;
