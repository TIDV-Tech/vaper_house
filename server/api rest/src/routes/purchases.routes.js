const { Router } = require("express")
const _var       = require("../global/var.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.GENERATE_PURCHASES, async (req, res) => {
	try {
		const { userId, paymentMethod } = req.body

		const purchase = await axios.post(`${_var.CONNECT_DB}register/purchase`, {
			userId,
      paymentMethod
		})
		.then((result) => {
			let data = result.data.data
			const invoice = [
				{
					"invoice": "FACTURA",
					"Proveedor": {
						"companyName": "VAPER HOUSE",
						"address": "Barrio Obrero carrera 20 entre calles 13 y 14, diagonal al Cine Pirineos, frente a casa Matina"
					},
					"Cliente":{
						"cliente": userId
					},
					"Identificacion de Factura": {
						"invoiceNumbering": "1", // este dato tiene que hacerse en la base de datos ya que tiene que ser diferente y debe tener una numeracion correlativa. si se van a incluir letras, tiene que ser mayuscuclas y no pueden haber espacios en blanco
						"dateIssue": data.purchaseSaved.createdAt
					},
					"saleData": {
						...data
					},
					"contactMethods": {
						"email": "vaperhouse.sc@gmail.com",
						"phone": "+58412-1729864 | +58414-7573307",
						"socialNetwork": {
							"facebook": "Vaper House",
							"instagram": "vaperhouse.vzla"
						}
					}
				}
			]
			res.send(invoice)
		})
		.catch((err) => {
			res.send({
				status: err.response.status,
				message: err.response.data.msg,
				error: err.response.data.error
			})
		}) 
	} catch (err) { console.log(err) }
})

module.exports = router