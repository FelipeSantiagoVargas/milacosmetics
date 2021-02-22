const ordersCtrl = {}

const Order = require('../models/Order')
const Product = require('../models/Product')

ordersCtrl.getOrders = async (req,res) => {
    const orders = await Order.find()
    const products = await Product.populate(orders,{path:'product'})
    res.json(products)
}



ordersCtrl.addOrder = async (req,res) => {
    const orders = req.body;
    let resOrders = [];
    await orders.forEach ( async (element) => {
        const newOrder = new Order(element)
        const add = await newOrder.save()
        resOrders.push(add)
        console.log(resOrders)
    });

    setTimeout(()=>{
     res.send({message:'Product has been added to purchase', orders:resOrders})
    },500);
    
}

ordersCtrl.getOrder = async (req,res) => {
    const order = await Order.findById(req.params.id)
    const products = await Product.populate(order,{path:'product'})
    res.json(products)
}

ordersCtrl.deleteOrder = async (req,res) => {
    await Order.findByIdAndDelete(req.params.id)
    res.json({status:'Product has been removed from the purchase'})
}

module.exports = ordersCtrl