var express = require('express');
var router = express.Router();
const UserController = require('../controller/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/register', UserController.regisUser);
router.post('/login', UserController.loginUser);

module.exports = router;
