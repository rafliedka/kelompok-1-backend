const { user } = require('../models');
const bcrypt = require('bcrypt');

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
            .create(req.body)
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
          res.status(400).send({ massage: 'User Already Exist' });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};
