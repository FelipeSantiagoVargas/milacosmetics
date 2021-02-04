const {Schema, model} = require('mongoose')
const Product = model('Product')

const orderSchema = new Schema({
    product: {type:Schema.ObjectId, ref:"Product" ,required:true},
    price: {type:Number, required:true},
    amount: {type:Number, required:true},
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Order', orderSchema);