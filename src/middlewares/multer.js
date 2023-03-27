const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file', file)
    cb(null, '../../user-uploads/')
  },
  filename: (req, file, cb) => {
    console.log('file', file)
    cb(null, file.originalname)
  },
})

const ImageUpload = multer({ storage: storage })

module.exports = ImageUpload