const jwt = require('../helper/jwt')
const {
  user
} = require('../models')

module.exports = async (req, res, next) => {
  try {
    const payload = jwt.verifyToken(req.headers.token)
    if (!payload) {
      res.status(404).send({
        message: 'User not found'
      })
    }

    const User = await user.findOne({
      where: {
        id: payload.id,
        email: payload.email,
        password: payload.password,
        role: payload.role
      }
    })

    if (!User) {
      res.status(404).send({
        message: 'user not found'
      })
    } else if (User.dataValues.role === 'buyer' || User.dataValues.role === 'seller') {
      req.userlogin = User.dataValues
      next()
    } else {
      res.status(403).send({
        message: 'user not authorized'
      })
    }
  } catch (err) {
    res.status(404).send({
      status: 404,
      message: 'User not found'
    })
  }
}