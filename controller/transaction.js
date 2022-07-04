const { transaction, product } = require('../models')

module.exports = class {
  static async getTransaction (req, res) {
    try {
      const sourceTransaction = await transaction.findOne({ where: { id: req.params.id }, include: { model: product } })
      res.status(201).send({
        status: 201,
        data: sourceTransaction
      })
    } catch (error) {
    }
  }

  static async addOffer (req, res) {
    try {
      const sourceProduct = await product.findOne({ where: { id: req.params.id } })
      // const verify = await transaction.findAll({ where: { product_id: req.params.id, buyer_id: req.userlogin.id }})

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

      const result = await transaction.create({
        seller_id: sourceProduct.user_id,
        product_id: req.params.id,
        buyer_id: req.userlogin.id,
        status: 1,
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
      const accept = await transaction.update({
        status: 2
      }, {
        where: {
          id: req.params.id
        }
      })
      res.status(201).send({
        status: 201,
        message: 'offer accepted',
        data: accept
      })
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message
      })
    }
  }

  static async rejecttOffer (req, res) {
    try {
      const reject = await transaction.update({
        status: 2
      }, {
        where: {
          id: req.params.id
        }
      })
      res.status(201).send({
        status: 201,
        message: 'offer rejected',
        data: reject
      })
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message
      })
    }
  }
}
