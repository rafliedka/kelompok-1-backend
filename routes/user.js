const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const auth = require('../middleware/authentication')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', UserController.getAllUser)
router.get('/:id', auth, UserController.fetchUserId)
router.post('/register', UserController.regisUser)
router.post('/login', UserController.loginUser)
router.put('/:id', auth, UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
