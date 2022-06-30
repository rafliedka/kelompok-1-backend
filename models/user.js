'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      contact: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.ENUM('buyer', 'seller'),
    },
    {
      hooks: {
        beforeCreate: (record, options) => {
          record.password = bcrypt.hashSync(record.password, 10);
        },
      },
      sequelize,
      modelName: 'user',
    }
  );
  /* user.associate = function (Model) {
    user.hasMany(Model.transaction)
    user.belongsTo(Model.product)
  } */
  return user;
};
