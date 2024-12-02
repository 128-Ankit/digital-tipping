const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dhzrloybt',  
    api_key: '246297145673249',     
    api_secret: 'wBRANpQXzvuEzZsch-WWMGJstP0'  
});

module.exports = cloudinary;

// cloudinary.config({
//     cloud_name: 'your-cloud-name', // Replace with your Cloudinary cloud name
//     api_key: 'your-api-key',       // Replace with your Cloudinary API key
//     api_secret: 'your-api-secret'  // Replace with your Cloudinary API secret
// });


