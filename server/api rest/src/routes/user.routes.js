const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validate_user.js')
const funct 	 = require('../fileSystem/createFile.js')
const router     = Router()

router.get(_var.ROOT, (req, res) => {
	res.send("Hello World")	
})

router.post(_var.REGISTER, async (req, res) => {
	const { name , email , password } = req.body
	const validate = await controller.checkRegister(name , email , password)
	res.status(validate.code).json(validate)
})

router.post(_var.LOGIN, async (req, res) => {
	const { email, password } = req.body
		let y = await controller.checkLogin(email, password)
		res.status(y.code).json(y)
})

module.exports = router