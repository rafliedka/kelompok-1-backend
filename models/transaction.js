'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  transaction.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      offer: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'transaction'
    }
  )
  transaction.associate = function (models) {
    transaction.belongsTo(models.product, { foreignKey: 'product_id' })
    transaction.belongsTo(models.user, { foreignKey: 'user_id' })
  }
  return transaction
}
