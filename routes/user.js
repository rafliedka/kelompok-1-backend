const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const auth = require('../middleware/authentication')

// cloudinary
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => 'users',
    format: async (req, file) => {
      return 'jpeg'
    },
    public_id: (req, file) => req.params.id
  },
});

const parser = multer({ storage })

router.get('/', UserController.getAllUser)
router.get('/:id', auth, UserController.fetchUserId)
router.post('/register', UserController.regisUser)
router.post('/login', UserController.loginUser)
router.put('/:id', auth, parser.single('photo'), UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
