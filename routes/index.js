var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.use('/users', require('./user'));
router.use('/product', require('./product'));


module.exports = router;