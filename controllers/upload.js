const multer = require('multer');
const path = require('path');

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define folder where images will be stored
    },
    filename: (req, file, cb) => {
        // Create a unique filename for each image
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filter for allowing only image file types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const isValidExtension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMimeType = allowedFileTypes.test(file.mimetype);

    if (isValidExtension && isValidMimeType) {
        cb(null, true); // Allow the file upload
    } else {
        cb(new Error('Only image files are allowed!'), false); // Reject non-image files
    }
};

// Set up multer with the storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Export the upload middleware to be used in routes
module.exports = upload;