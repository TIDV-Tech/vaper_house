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
		const { fullName , email , dateBirth, password } = req.body

		const validate = await controller.checkRegister( fullName , email , dateBirth, password )
		//console.log(validate)
		/* const info = await axios.post('http://localhost:5001/register/user', {
			fullName: name, 
			email: email, 
			dateBirth: new Date(date),
			password: password
		})
		console.log(info) */

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
	} catch (err) { console.log(err) }
})

router.get(_var.VIEW_ALL_USER, async (req, res) => {
	try {
    const { id } = req.query
    const user = await controller.viewUser(id)
    res.send(user)
  } catch (err) { console.log(err) }
})

router.get(_var.VIEW_USER, async (req, res) => {
	try {
    const { id } = req.query
    const user = await controller.viewUser(id)
    res.send(user)
  } catch (err) { console.log(err) }
})


router.post(_var.EDIT_USER, async (req, res) => {
	try {
		const { id_user , fullname , email , dateBirth , password } = req.body 
		const info = {
		  id_user: 1,
		  fullname: "Diego A Cabrera M",
		  email: "kenaa@example.com",
		  dateBirth: "1990-01-01",
		  password: "123456"
		}
		
		let user = await controller.editUser( id_user , fullname, email, dateBirth, password , info )
		res.send(user)
	  } catch (err) { console.log(err) }	
})

router.get(_var.DELETE_USER, async (req, res) => {

})

module.exports = router