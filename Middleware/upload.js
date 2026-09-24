const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');
const { param } = require('../Routes/ProductRoutes');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
  folder: 'uploads', // Specify the folder in Cloudinary where files will be stored
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Specify allowed file formats
  transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional transformation
  }
});

const upload = multer({ storage: storage });

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
};

module.exports = { upload, uploadToCloudinary };