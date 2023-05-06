const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validate_user.js')
const axios      = require('axios')
const router     = Router()

router.get(_var.ROOT, (req, res) => {
	res.send("Hello World")	
})

router.post(_var.REGISTER, async (req, res) => {
	try {
		const { name , email , password } = req.body
	/* 	axios.post('/register', {
			name: 'prueba', 
			email: 'prueba@gmail', 
			password: 'prueba'
		}) */
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

		let validateUser = await controller.checkLogin(correo, email, password)
		res.send('Data del usuario enviada exitosamente')
	} catch (err) { throw err}
})

axios.post('/register/user', {
	name: 'name', 
	email: 'email@email.com', 
	password: 'password'
})

module.exports = router