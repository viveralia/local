const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

let storage = cloudinaryStorage({
  cloudinary,
  folder: 'project-2',
  allowedFormats: ['jpg', 'png'],
  filename: (req, res, cb) => {
    cb(null, file.originalname)
  }
})

module.exports = multer({ storage })
