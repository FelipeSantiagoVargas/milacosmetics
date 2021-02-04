const productsCtrl = {}

const Product = require('../models/Product')

productsCtrl.getProducts = async (req,res) => {
    const products = await Product.find()
    res.json(products)
}

productsCtrl.createProduct = async (req,res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.send({message:'Product Created'})
}

productsCtrl.getProduct = async (req,res) => {
    const product = await Product.findById(req.params.id)
    res.send(product)
}

productsCtrl.editProduct = async (req,res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.json({status:'Product Updated'})
}

productsCtrl.deleteProduct = async (req,res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.json({status:'Product Deleted'})
}

module.exports = productsCtrl