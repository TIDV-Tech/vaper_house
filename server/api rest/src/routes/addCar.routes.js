const { Router } = require('express')
const axios      = require('axios')
const _var       = require('../global/var.js')
const funct      = require('../controllers/validate_car.js')
const added      = require('../fileSystem/createFile.js')
const router     = Router()

router.post(_var.ADDCAR, async(req,res)=>{
	try {
		const { userId, productId, quantityProducts } = req.body
		
		const allProduct = await axios.get('http://localhost:5001/products')
		.then((result) => {
			let car = result.data.data
			const validate = funct.carValidate(car, productId, quantityProducts)
			res.status(validate.code).json(validate)
		})
		.catch((err) => {
			console.log(err)	
		})

		const product = await axios.post('http://localhost:5001/add/cart', {
			userId,
      productId,
			quantityProducts
		})
		
		/* if(validate.code == 200) {
			const add = await added.addCar(obj)
			res.status(validate.code).json(validate)
		} */
	} catch (err) { console.log(err) }
})

module.exports = router