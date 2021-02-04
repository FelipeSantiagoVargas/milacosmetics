const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    reference: {type:Number, required:true},
    name: {type:String, required:true},
    price_purchase: {type:Number, required:true},
    price_sale: {type:Number, required:true},
    stock: {type:Number, required:true},
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Product', productSchema);