const { Routes } = require('express')
const _var       = require('../global/var.js')
const funct      = require('../fileSystem/createFile.js')
const validate   = require('../controllers/validate_car.js')
const router     = Routes()

router.post(_var.ADDCAR, async(req,res)=>{
	try {
		const { id_user, id_product, cant_prod } = req.body
		const obj = {
			info: [{id_user, id_product, cant_prod}]
		}
		const value = funct.addCar(obj)
		if(typeof value == 'object') { return res.json(value) }
		res.json({status: true, message: "Archivo creado!", value})
	} catch (err) { throw err }
})

module.exports = router