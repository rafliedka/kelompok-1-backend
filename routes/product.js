const express = require('express')
const router = express.Router()
const ProductController = require('../controller/product')
const sellerAuth = require('../middleware/isSeller')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', sellerAuth, ProductController.getAllProduct)
router.get('/:id', sellerAuth, ProductController.getProductById)
router.post('/', sellerAuth, ProductController.addProduct)
router.put('/:id', sellerAuth, ProductController.updateProduct)
router.delete('/:id', sellerAuth, ProductController.deleteProduct)

module.exports = router
