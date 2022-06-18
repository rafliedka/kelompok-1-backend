'use strict';
const { Model } = require('sequelize');
const transaction = require('./transaction');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.user);
      product.hasOne(models.transaction);
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      category: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'product',
    }
  );
  return product;
};
