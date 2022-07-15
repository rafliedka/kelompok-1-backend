const express = require('express')
const router = express.Router()
const TransactionController = require('../controller/transaction')
const auth = require('../middleware/authentication')
const sellerAuth = require('../middleware/isSeller')

// Multer User
/* const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photoUser')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage }) */

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/offer/:id', auth, TransactionController.getTransaction)
router.post('/offer/:id', auth, TransactionController.addOffer)
router.put('/offer/accept/:id', sellerAuth, TransactionController.acceptOffer)
router.put('/offer/reject/:id', sellerAuth, TransactionController.rejectOffer)

module.exports = router