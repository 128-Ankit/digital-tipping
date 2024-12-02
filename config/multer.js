const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Images', // Folder name in your Cloudinary account
        format: async (req, file) => 'jpeg', // Optional: specify file format
        public_id: (req, file) => Date.now(), // Generate a unique ID for each file
    },
});

// Set up multer with the Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
