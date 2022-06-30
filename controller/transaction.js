const { transaction, product } = require('../models')

module.exports = class {
  static async firstOffer (req, res) {
    try {
      const sourceProduct = product.findOne({ where: { id: req.params.id } })

      const first = transaction.create({
        product_id: req.params.id,
        seller_id: sourceProduct.seller_id,
        buyer_id: req.userlogin.id,
        status: 1,
        offer: req.body.offer
      })

      const dataTransaction = JSON.parse(JSON.stringify(first))
      res.status(201).send({
        status: 201,
        message: 'Berhasil Menawar!',
        data: dataTransaction
      })
    } catch (error) {
      res.status(201).json({
        status: 'FAIL',
        message: error.message
      })
    }
  }
}
