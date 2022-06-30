const { product, user } = require('../models')

module.exports = class {
  static async getAllProduct (req, res) {
    const result = await product.findAll({
      include: [{ model: user }]
    })
    try {
      res.status(200).json({
        status: 200,
        data: result
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static async getProductById (req, res) {
    const result = await product.findOne({ where: { id: req.params.id }, include: [{ model: user }] })
    try {
      res.status(200).json({
        status: 200,
        data: result
      })
    } catch (error) {
      res.send(error)
    }
  }

  // user yang sama ga bisa update lebih dari 5 kali
  static async addProduct (req, res) {
    const result = await product.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      user_id: req.body.user_id
    })
    try {
      res.status(201).json({
        status: 201,
        message: 'product has been added',
        data: result
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static async updateProduct (req, res) {
    await product.update({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      user_id: req.body.user_id
    }, { where: { id: req.params.id } })
    try {
      res.status(201).json({
        status: 201,
        message: 'car data has been update',
        data: req.body
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static async deleteProduct (req, res) {
    await product.destroy({ where: { id: req.params.id } })
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
}
