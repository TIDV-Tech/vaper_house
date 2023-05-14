const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_purchase.js")
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
			res.send(result.data)
		})
		.catch((err) => {
			res.send(err.response)
		})
	} catch (err) { console.log(err) }
})

module.exports = router