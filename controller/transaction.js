const { transaction, product } = require('../models')

module.exports = class {
  static async getTransaction (req, res) {
    try {
      const result = await transaction.findOne({ where: { id: req.params.id }, include: { model: product } })
      res.status(201).send({
        status: 201,
        data: result
      })
    } catch (error) {
    }
  }

  static async addOffer (req, res) {
    try {
      const sourceProduct = await product.findOne({ where: { id: req.params.id } })
      if (sourceProduct.user_id === req.userlogin.id) {
        return (
          res.status(400).json({
            message: 'can not buy your product'
          })
        )
      }

      if (req.body.offer > sourceProduct.price) {
        return (
          res.status(500).json({
            message: 'your offer higer than normal price'
          })
        )
      }

      console.log(req.body)
      const result = await transaction.create({
        seller_id: sourceProduct.user_id,
        product_id: req.params.id,
        buyer_id: req.userlogin.id,
        status: 0,
        offer: req.body.offer
      })
      res.status(201).send({
        status: 201,
        message: 'add offer',
        data: result
      })
    } catch (error) {
      res.status(402).json({
        status: 402,
        message: error.message
      })
    }
  }

  static async acceptOffer (req, res) {
    try {
      const result = await transaction.update({
        status: 1
      }, {
        where: {
          id: req.params.id
        },
        returning: true
      })
      res.status(201).json({
        status: 201,
        message: 'offer accepted',
        data: result
      })
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message
      })
    }
  }

  static async rejectOffer (req, res) {
    try {
      const result = await transaction.update({
        status: 2
      }, {
        where: {
          id: req.params.id
        },
        returning: true
      })
      res.status(201).send({
        status: 201,
        message: 'offer accepted',
        data: result
      })
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message
      })
    }
  }
}