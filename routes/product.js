const express = require('express')
const router = express.Router()
const ProductController = require('../controller/product')
const sellerAuth = require('../middleware/isSeller')

// Multer Product
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
const upload = multer({
  storage
})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', ProductController.getAllProduct)
router.get('/:id', sellerAuth, ProductController.getProductById)
router.post('/', sellerAuth, upload.single('image'), ProductController.addProduct)
router.put('/:id', sellerAuth, upload.single('image'), ProductController.updateProduct)
router.delete('/:id', sellerAuth, ProductController.deleteProduct)

module.exports = router
