var express = require('express');
var router = express.Router();
const ProductController = require('../controller/ProductController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/product', ProductController.getAllProduct);
router.get('/product/:id', ProductController.getProductById);
router.post('/product', ProductController.addProduct);
router.put('/product', ProductController.updateProduct);
router.delete('/product', ProductController.deleteProduct);


module.exports = router;