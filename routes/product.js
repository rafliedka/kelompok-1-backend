const express = require('express')
const router = express.Router()
const ProductController = require('../controller/product')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', ProductController.getAllProduct)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router
