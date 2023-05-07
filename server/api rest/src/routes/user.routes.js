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
		return res.status(validate.code).json(validate)
	} catch (err) { throw err }
})

router.post(_var.LOGIN, async (req, res) => {
	try {
		const { email, password } = req.body
		const correo = [
			{cor_elec: "chacon@root.com", clave: "chacon"},
			{cor_elec: "prueba@root.com", clave: "prueba"},
			{cor_elec: "user@root.com",   clave: "user"}
		]

		let validateUser = await controller.checkLogin(correo, email, password)
		res.status(validateUser.code).json(validateUser)
	} catch (err) { throw err}
})

/* axios.post('/register/user', {
	name: 'name', 
	email: 'email@email.com', 
	password: 'password'
}) */

router.get(_var.VIEW_ALL_USER, async (req, res) => {
	try {
    const { id } = req.query
    const user = await controller.viewUser(id)
    res.send(user)
  } catch (err) { throw err }
})

router.get(_var.VIEW_USER, async (req, res) => {
	try {
    const { id } = req.query
    const user = await controller.viewUser(id)
    res.send(user)
  } catch (err) { throw err }
})


router.get(_var.EDIT_USER, async (req, res) => {

})

router.get(_var.DELETE_USER, async (req, res) => {

})

module.exports = router