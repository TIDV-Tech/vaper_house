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
		const { name , email , date, password } = req.body

		const validate = await controller.checkRegister(name , email, password)

		const a = await axios.post('http://localhost:5001/register/user', {
			fullName: name, 
			email: email, 
			dateBirth: new Date(date),
			password: password
		})
		console.log(a)

		return res.status(validate.code).json(validate)
	} catch (err) { console.log(err.data) }
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