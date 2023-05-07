const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_product.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.GENERATE_PURCHASES, (req, res) => {
	try {
		
	} catch (err) { console.log(err) }
})

router.post(_var.GENERATE_INVOICE, (req, res) => {
	try {
		
	} catch (err) { console.log(err) }
})

module.exports = router