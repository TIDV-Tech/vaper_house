const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validate_user.js')
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
	//let x = await controller.checkRegister(email, password)
	//if(x.status) res.status(500).json({ message: "User already registered", status: false })
	//if(!x.status){
		let y = await controller.checkLogin(email, password)
		res.status(y.code).json(y)
	//} 
})

module.exports = router