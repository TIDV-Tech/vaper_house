const { Router } = require('express')
const _var       = require('../global/var.js')
const router     = Router()

router.get(_var.ROOT, (req, res) => {
	res.send("Hello World")	
})

module.exports = router