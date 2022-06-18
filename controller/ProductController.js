const product = require('../models/product');

module.exports = class {
    static async getAllProduct(req, res){
        try {
            const result = await product.findAll()
            res.status(201).json({
                status: 201,
                data: result
            })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async getProductById(req, res) {
        try {
            const result = await product.findOne({where: {id: req.params.id}})
            res.send("data 1")
        } catch (error) {
            res.send(error)
        }
    }

    static async addProduct(req, res) {
        const result = product.create(req.body)
        res.status(201).json({
            status: 201,
            message: 'product data has been created',
            data: result
        })
    }

    static async updateProduct(req, res) {
        try {
            res.send('success')
        } catch (error) {
            res.send(error)
        }
    }
    
    static async deleteProduct(req, res) {
        try {
            res.send('success')
        } catch (error) {
            res.send(error)
        }
    }
}