const { Router } = require('express')
const _var       = require('../global/var.js')
const funct      = require('../controllers/validate_car.js')
const added      = require('../fileSystem/createFile.js')
const router     = Router()

router.post(_var.ADDCAR, async(req,res)=>{
	try {
		const { id_user, id_product, cant_prod } = req.body
		const obj = {
			info: [{id_user, id_product, cant_prod}]
		}

		const products  = [
			{id: 1, cantidad: 10},
			{id: 2, cantidad: 12},
			{id: 3, cantidad: 13},
			{id: 4, cantidad: 14}
		]

		const validate = await funct.carValidate(products , obj)
		if(validate.code == 200) {
			const add = await added.addCar(obj)
			res.status(validate.code).json(validate)
		}

		// // console.log(add)

		

	} catch (err) { console.log(err) }
})

module.exports = router