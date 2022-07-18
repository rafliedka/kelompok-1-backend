const express = require('express')
const router = express.Router()
const ProductController = require('../controller/product')
const sellerAuth = require('../middleware/isSeller')

const cloudinary = require('cloudinary').v2
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

const parser = multer({ storage })

router.get('/', ProductController.getAllProduct)
router.get('/:id', sellerAuth, ProductController.getProductById)
router.post('/', sellerAuth, parser.single('image'), ProductController.addProduct)
router.put('/:id', sellerAuth, parser.single('image'), ProductController.updateProduct)
router.delete('/:id', sellerAuth, ProductController.deleteProduct)

module.exports = router
