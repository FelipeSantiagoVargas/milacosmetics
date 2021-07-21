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

salesCtrl.getSaleDay = async (req,res) => {
    const now = new Date()
    const query = {date:{"$gte":new Date(now.getFullYear(),now.getMonth(),now.getDate())}}
    const sale = await Sale.find(query)
    const orders = await Order.populate(sale,{path:'orders'})
    res.send(orders)
}

salesCtrl.getSaleMonth = async (req,res) => {
    const now = new Date()
    const query = {date:{"$gte":new Date(now.getFullYear(),now.getMonth(),1)}}
    const sale = await Sale.find(query)
    const orders = await Order.populate(sale,{path:'orders'})
    res.send(orders)
}

salesCtrl.getAllMonths = async (req,res) => {
    console.log('entro')
    const query = [
        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt"
              },
              mes: {
                $month: "$createdAt"
              }
            },
            ventas: {
              $push: {
                total: "$price",
                
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            mes: "$_id.mes",
            total: {
              $reduce: {
                input: "$ventas",
                initialValue: 0,
                in: {
                  $sum: [
                    "$$value",
                    "$$this.total"
                  ]
                }
              }
            }
          }
        },
        {
          $group: {
            _id: "$year",
            ventas: {
              $push: {
                mes: "$mes",
                total: "$total"
              }
            }
          }
        }
      ]

    const sale = await Order.aggregate(query)


    var fs = require('fs');
    var writeStream = fs.createWriteStream("./src/public/extractos.xls");
    var header="Año"+"\t"+"Mes"+"\t"+"Ventas"+"\n";
      
    writeStream.write(header);

    for (let i = 0; i < sale.length; i++) {
        let row = ''+sale[i]._id;
        for (let j = 0; j < sale[i].ventas.length; j++) {
            console.log('entro')
            row = row + "\t"+sale[i].ventas[j].mes+"\t"+sale[i].ventas[j].total+"\n";
            writeStream.write(row);
            row = ''+sale[i]._id;
        }
    }

    writeStream.close();
    res.send(sale)
}

salesCtrl.deleteSale = async (req,res) => {
    await Sale.findByIdAndDelete(req.params.id)
    res.json({status:'Sale Deleted'})
}

module.exports = salesCtrl