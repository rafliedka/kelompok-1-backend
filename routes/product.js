const express = require('express')
const router = express.Router()
const ProductController = require('../controller/product')
const sellerAuth = require('../middleware/isSeller')

/* const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'product',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => req.params.id
  }
})

const parser = multer({ storage }) */

// Multer User
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photoProduct')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

module.exports = upload

router.get('/', ProductController.getAllProduct)
router.get('/:id', sellerAuth, ProductController.getProductById)
router.post('/', sellerAuth, upload.single('image'), ProductController.addProduct)
router.put('/:id', sellerAuth, upload.single('image'), ProductController.updateProduct)
router.delete('/:id', sellerAuth, ProductController.deleteProduct)

module.exports = router
