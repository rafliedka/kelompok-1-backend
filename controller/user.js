const {
  user
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt');

module.exports = class {
  // Register
  static regisUser(req, res, next) {
    user
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((User) => {
        if (!User) {
          user
            .create({
              ...req.body,
              role: 'buyer'
            })
            .then((result) => {
              res.status(201).send({
                status: 201,
                message: 'User Succesfully Registered!',
                data: result,
              });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        } else {
          res.status(400).send({
            massage: 'User Already Exist'
          });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  // Login
  static async loginUser(req, res, next) {
    try {
      // check user with email
      const users = await user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!users) {
        res.status(404).send({
          status: 404,
          message: 'User Not Found',
        });
      }

      // check user with password
      const isValidPassword = await bcrypt.compare(req.body.password, users.password);
      // console.log(isValidPassword);
      if (!isValidPassword) {
        res.status(400).send({
          status: 400,
          message: 'Email and Password Not Match',
        });
      }

      // generate token user with jwt
      const token = jwt.generateToken({
        email: users.email,
        password: users.password,
      });

      const secureUser = users.dataValues;
      delete secureUser.password;

      res.status(200).send({
        status: 200,
        message: 'User Found',
        data: {
          users: secureUser,
          token: token,
        },
      });
    } catch (error) {
      res.status(404).send(error);
    }
  }
};