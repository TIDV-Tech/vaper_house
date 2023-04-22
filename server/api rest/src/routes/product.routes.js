const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validate_product.js')
const router     = Router()

router.post(_var.REG_PRO, (req, res) => {
	const { nombre, marca, color, cantidad, fecha_ingreso, precio } = req.body
	let product = controller.regisProduct(nombre, marca, color, cantidad, fecha_ingreso, precio)
	res.status(product.code).json(product)
})

module.exports = router