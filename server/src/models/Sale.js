const {Schema, model} = require('mongoose')
const Order = model('Order')

const saleSchema = new Schema({
    orders: [{type:Schema.ObjectId, ref:"Order" ,required:true}],
    date: {type:Date, required:true},
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Sale', saleSchema);