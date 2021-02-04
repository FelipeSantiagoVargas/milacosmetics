const salesCtrl = {}

const Sale = require('../models/Sale')
const Order = require('../models/Order')

salesCtrl.getSales = async (req,res) => {
    const sales = await Sale.find()
    const orders = await Order.populate(sales,{path:'orders'})
    res.json(orders)
}

salesCtrl.createSale = async (req,res) => {
    const newSale = new Sale(req.body)
    await newSale.save()
    res.send({message:'Sale Created'})
}

salesCtrl.getSale = async (req,res) => {
    const sale = await Sale.findById(req.params.id)
    const orders = await Order.populate(sale,{path:'orders'})
    res.send(orders)
}

salesCtrl.deleteSale = async (req,res) => {
    await Sale.findByIdAndDelete(req.params.id)
    res.json({status:'Sale Deleted'})
}

module.exports = salesCtrl