<<<<<<< HEAD
var express = require('express');
var router = express.Router();
const UserController = require('../controller/user');
const isSeller = require('../middleware/isSeller');
const isBuyer = require('../middleware/isBuyer');
=======
const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
>>>>>>> cc0b6af8004d3cbdcb3a73825d58d7a3a252e21c

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
<<<<<<< HEAD
router.post('/register', UserController74
    .regisUser);
router.post('/login', UserController.loginUser);

module.exports = router;
=======
router.get('/', UserController.getAllUser)
router.get('/:id', UserController.fetchUserId)
router.post('/register', UserController.regisUser)
router.post('/login', UserController.loginUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
>>>>>>> cc0b6af8004d3cbdcb3a73825d58d7a3a252e21c
