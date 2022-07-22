const { user } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('../helper/jwt')

module.exports = class {
  // get user data
  static async getAllUser(req, res) {
    try {
      const result = await user.findAll()
      res.status(200).json({
        status: 200,
        data: result
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  // fetch id user
  static async fetchUserId(req, res) {
    try {
      const result = await user.findOne({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        status: 200,
        data: result
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  // update user
  // error update ke password yang sama jadi hashing 2 kali
  static async updateUser(req, res) {
    try {
      const result = await user.update(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          contact: req.body.contact,
          photo: req.body.photo,
          address: req.body.address,
          role: 'seller'
        },
        {
          where: req.userlogin, returning: true
        }
      )
      res.status(201).json({
        status: 201,
        message: 'user data has been update',
        data: result
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static async deleteUser(req, res) {
    await user.destroy({
      where: {
        id: req.params.id
      }
    })
    try {
      res.status(204).json({
        staus: 204,
        message: 'product has been deleted'
      })
    } catch (error) {
      res.status(422).json({
        status: 422,
        message: error.message
      })
    }
  }

  // Register
  static async regisUser(req, res, next) {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    try {
      const users = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        contact: req.body.contact,
        photo: req.body.photo,
        address: req.body.address,
        role: 'buyer'
      })

      // generate token user with jwt
      const token = jwt.generateToken({
        id: users.id,
        email: users.email,
        password: users.password,
        role: users.role
      })

      res.status(201).send({
        status: 201,
        message: 'User Succesfully Registered!',
        data: {
          user: users,
          token
        }
      })
    } catch (error) {
      res.status(404).send(error)
    }
    /* user
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((User) => {
        if (!User) {
          user
            .create({
              name: req.body.name,
              email: req.body.email,
              password: passwordHash,
              contact: req.body.contact,
              photo: req.body.photo,
              address: req.body.address,
              role: 'buyer'
            })
            .then((result) => {
              const token = jwt.generateToken({
                email: user.email,
                password: user.password
              })

              res.status(201).send({
                status: 201,
                message: 'User Succesfully Registered!',
                data: {
                  users: result,
                  token
                }
              })
            })
            .catch((err) => {
              res.status(400).send(err)
            })
        } else {
          res.status(400).send({
            massage: 'User Already Exist'
          })
        }
      })
      .catch((err) => {
        res.status(400).send(err)
      }) */
  }

  // Login
  static async loginUser(req, res, next) {
    try {
      // check user with email
      const users = await user.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!users) {
        res.status(404).send({
          status: 404,
          message: 'User Not Found'
        })
      }

      // check user with password
      const isValidPassword = await bcrypt.compare(req.body.password, users.password)

      // console.log(isValidPassword);
      if (!isValidPassword) {
        res.status(400).send({
          status: 400,
          message: 'Email and Password Not Match'
        })
      }

      // generate token user with jwt
      const token = jwt.generateToken({
        id: users.id,
        email: users.email,
        password: users.password,
        role: users.role
      })

      const secureUser = users.dataValues
      delete secureUser.password

      res.status(200).send({
        status: 200,
        message: 'User Found',
        data: {
          users: secureUser,
          token
        }
      })
    } catch (error) {
      res.status(404).send(error)
    }
  }
}