const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');

const storage = CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads', // Specify the folder in Cloudinary where files will be stored
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Specify allowed file formats
  transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional transformation
});
