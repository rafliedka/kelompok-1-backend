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
    const result = await product.findOne({ where: { id: req.params.id }, include: { model: user } })
    try {
      res.status(200).json({
        status: 200,
        data: result
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async addProduct (req, res) {
    product
      .create({
        name: req.body.name,
        image: req.file.path,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        user_id: req.body.user_id,
        avalilable: true
      })
      .then((result) => {
        res.status(201).json({
          status: 201,
          message: 'product has been added',
          data: result
        })
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  }

  static async updateProduct (req, res) {
    const result = await product.update({
      name: req.body.name,
      description: req.body.description,
      image: req.file.path,
      price: req.body.price,
      category: req.body.category,
      user_id: req.body.user_id
    }, { where: { id: req.params.id }, returning: true })
    try {
      res.status(201).json({
        status: 201,
        message: 'product data has been update',
        data: result
      })
    } catch (err) {
      res.status(400).send(err)
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
