const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validate_user.js')
const funct 	   = require('../fileSystem/createFile.js')
const router     = Router()

router.get(_var.ROOT, (req, res) => {
	res.send("Hello World")	
})

router.post(_var.REGISTER, async (req, res) => {
	try {
		const { name , email , password } = req.body
		const validate = await controller.checkRegister(name , email , password)
		res.status(validate.code).json(validate)
	} catch (err) { throw err }
})

router.post(_var.LOGIN, async (req, res) => {
	try {
		const { email, password } = req.body
		const correo = [
			"chacon@root.com",
			"prueba@root.com",
			"user@root.com"
		]
		let validateCar = await funct.carValidate(correo, email)
	
		//let y = await controller.checkLogin(email, password)
		//res.status(y.code).json(y)
		res.send('Data enviada')
	} catch (err) { throw err}
})

module.exports = router