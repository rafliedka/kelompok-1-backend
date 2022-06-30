var express = require('express');
var router = express.Router();
const UserController = require('../controller/user');
const isSeller = require('../middleware/isSeller');
const isBuyer = require('../middleware/isBuyer');

// Multer User
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photoUser');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', UserController.getAllUser);
router.get('/:id', UserController.fetchUserId);
router.post('/register', UserController.regisUser);
router.post('/login', UserController.loginUser);
router.put('/:id', upload.single('photo'), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
