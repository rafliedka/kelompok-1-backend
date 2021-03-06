const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
// const auth = require('../middleware/authentication')

// cloudinary
/* const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => 'product',
    format: async (req, file) => {
      return 'jpeg'
    },
    public_id: (req, file) => req.params.id
  },
});
const upload = multer({ storage }) */

// Multer User
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/photoUser')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({
  storage
})

router.get('/', UserController.getAllUser)
router.get('/:id', UserController.fetchUserId)
router.post('/register', UserController.regisUser)
router.post('/login', UserController.loginUser)
router.put('/update/:id', upload.single('photo'), UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router