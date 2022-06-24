var express = require('express');
var router = express.Router();
const UserController = require('../controller/user');
const isSeller = require('../middleware/isSeller');
const isBuyer = require('../middleware/isBuyer');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/register', UserController74
    .regisUser);
router.post('/login', UserController.loginUser);

module.exports = router;