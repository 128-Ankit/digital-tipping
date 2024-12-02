const User = require('../models/User');
const upload = require('../config/multer');

// Handle user registration with image and banner image upload
const registerUser = async (req, res) => {
    try {
        // Configure multer to handle multiple images and a banner image
        upload.fields([
            { name: 'images', maxCount: 5 }, // Up to 5 images
            { name: 'bannerImage', maxCount: 1 } // 1 banner image
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ error: err.message }); // Handle upload errors
            }

            // Extract user details from the request body
            const { name, email, password } = req.body;

            // Extract file URLs from the uploaded files
            const images = req.files.images ? req.files.images.map(file => file.path) : [];
            const bannerImage = req.files.bannerImage ? req.files.bannerImage[0].path : null;

            // Create a new user object
            const newUser = new User({
                name,
                email,
                password,
                images, // Save the array of image URLs
                bannerImage // Save the banner image URL
            });

            // Save the new user to the database
            const user = await newUser.save();

            // Respond with success
            res.status(201).send({
                message: 'User registered successfully',
                user
            });
        });
    } catch (err) {
        // Catch any errors during the process
        console.error(err);
        res.status(500).send({ error: 'An error occurred during registration' });
    }
};

module.exports = { registerUser };
