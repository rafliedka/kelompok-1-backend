'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  images.init({
    product_id: DataTypes.INTEGER,
    img: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'images'
  })

  images.associate = function(models) {
    images.belongsTo(models.product, {
      foreignKey: 'product_id'
    })
  }
  return images
}