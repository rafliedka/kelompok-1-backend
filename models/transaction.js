'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsToMany(user, {
        foreignKey: 'user_id'
      });
      transaction.belongsTo(product, {
        foreignKey: 'product_id'
      });
    }
  }
  transaction.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};