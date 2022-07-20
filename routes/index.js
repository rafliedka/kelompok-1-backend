const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  })
})

router.use('/users', require('./user'))
router.use('/product', require('./product'))
router.use('/product', require('./transaction'))

module.exports = router