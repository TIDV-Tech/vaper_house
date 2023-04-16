const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validateRegister.js')
const router     = Router()

router.get(_var.ROOT, (req, res) => {
	res.send("Hello World")	
})

router.post(_var.REGISTER, async (req, res) => {
	const { name , email , password } = req.body
	const validate = await controller.checkRegister(name , email , password)
	res.status(validate.code).json(validate)
})

module.exports = router