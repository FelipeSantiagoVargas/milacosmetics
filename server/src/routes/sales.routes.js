const{ Router } = require('express')

const router = Router()

const salesCtrl = require('../controller/sales.controller.js')

router.get('/all', salesCtrl.getAllMonths)
router.get('/', salesCtrl.getSales)
router.get('/day', salesCtrl.getSaleDay)
router.get('/month', salesCtrl.getSaleMonth)
router.post('/', salesCtrl.createSale)
router.get('/:id', salesCtrl.getSale)
router.delete('/:id', salesCtrl.deleteSale)

module.exports = router