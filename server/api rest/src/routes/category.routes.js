const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_category.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.REGISTER_CATEGORIES, async (req, res) => {
	try {
		const { title, link, img } = req.body

		const category = await axios.post(`${_var.CONNECT_DB}register/category`, { 
			title, 
			link, 
			img 
		})
		.then((result) => {
			delete result.data.data.createdAt
			delete result.data.data.updatedAt
			res.send(result.data)
		})
		.catch((err) => {
			res.send(err.response)
		})
	} catch (err) { console.log(err) }
})

router.post(_var.UPDATE_CATEGORY, async (req, res) => {
	try {
		const { categoryId, newData } = req.body
		
		const validate = controller.validateCategory(newData) 
		if (validate) {
			return(res.status(validate.code).json(validate))
		}
		const updatedData = await axios.post(`${_var.CONNECT_DB}update/category`, { 
			categoryId: categoryId, 
			newData: newData 
		})
		.then((result) => {
			res.send({
				status: result.data.status,
				message: result.data.msg,
				newData: newData
			})
		}).catch((err) => {
			console.log(err)
		})
	} catch (err) { console.log(err) }
})

router.post(_var.DELETE_CATEGORY, async (req, res) => {
	try {
		const { categoryId } = req.body

		const deleteData = await axios.post(`${_var.CONNECT_DB}delete/category`, { categoryId })
		.then((result) => {
			res.send(result.data)
		}).catch((err) => {
			console.log(err)
		})
	} catch (err) { console.log(err) }
})

module.exports = router