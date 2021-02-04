const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.set('port', process.env.PORT || 4000)

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/products',require('./routes/products.routes'))
app.use('/api/orders',require('./routes/orders.routes'))
app.use('/api/sales',require('./routes/sales.routes'))

module.exports = app;