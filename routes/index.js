const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
<<<<<<< HEAD
  res.render('index', {
    title: 'Express'
  });
});
router.use('/users', require('./user'));
router.use('/product', require('./product'));
=======
  res.render('index', { title: 'Express' })
})
router.use('/users', require('./user'))
router.use('/product', require('./product'))
>>>>>>> cc0b6af8004d3cbdcb3a73825d58d7a3a252e21c

module.exports = router
