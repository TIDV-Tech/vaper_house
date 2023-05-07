const { Router } = require('express')
const _var       = require('../global/var.js')
const funct      = require('../fileSystem/createFile.js')
const router     = Router()

router.post(_var.ADDCAR, async(req,res)=>{
	try {
		const { id_user, id_product, cant_prod } = req.body
		const obj = {
			info: [{id_user, id_product, cant_prod}]
		}

		const product  = [
			{id: 1, cantidad: 10},
			{id: 2, cantidad: 12},
			{id: 3, cantidad: 13},
			{id: 4, cantidad: 14}
		]

		const validate = await funct.carValidate(id_product, product, cant_prod, obj)
		return res.status(validate.code).json(validate)
	} catch (err) { throw err }
})

module.exports = router