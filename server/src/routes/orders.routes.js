const{ Router } = require('express')

const router = Router()

const ordersCtrl = require('../controller/orders.controller.js')

router.get('/', ordersCtrl.getOrders)
router.post('/', ordersCtrl.addOrder)
router.get('/:id', ordersCtrl.getOrder)
router.delete('/:id', ordersCtrl.deleteOrder)

module.exports = router