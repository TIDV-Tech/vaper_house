const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validate_user.js')
const addCar 	 = require('../fileSystem/createFile.js')
const router     = Router()

router.get(_var.ROOT, (req, res) => {
	res.send("Hello World")	
})

router.post(_var.REGISTER, async (req, res) => {
	const { name , email , password } = req.body
	const validate = await controller.checkRegister(name , email , password)
	res.status(validate.code).json(validate)
})

router.post("/agregarCar" , async(req,res)=>{
	try {
		const { id_user , id_product , cant_prod } = req.body
		// const info = [{
		// 	id_user:1,
		// 	id_product:1,
		// 	cant_prod:1
		// }]

		const validate = await addCar(id_user , id_product , cant_prod)
		res.send(validate)
	
		// const add = addCar(info)
		
	} catch (err) {
		console.log(err)
	}
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