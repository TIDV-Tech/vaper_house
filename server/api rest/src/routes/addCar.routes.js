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

		const validate = funct.carValidate(id_product, product, cant_prod, obj)

		/* const value 	 = funct.addCar(obj)
		if(typeof value == 'object') { return res.json(value) }
		res.json({status: true, message: "Archivo creado!", value}) */
		res.send('Añadido al carrito')
	} catch (err) { throw err }
})

module.exports = router