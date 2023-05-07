const regisProduct = (tipo_producto , nombre , descripcion , marca , cantidad,  precio ,fecha_ingreso , img) => {
	try {
		let message = {
			status: true,
      message: "There are no registered products",
      code: 200
		}

		if(cantidad > 10){
			message = {
				status: true,
				message: "Product entered into wholesale sales",
				code: 200
			}
		} else if(cantidad <= 10) {
			msg = {
				status: true,
				message: "Product entered into retail sales",
				code: 200
			}
		} else {
			msg = {
				status: false,
				message: "There is an error in the product registration",
				code: 500
			}
		}
		return msg
	} catch (err) { throw err }  
}

const editProduct = (product) => {
	try {
		console.log(product)
	} catch (err) { throw err }
}
  
  module.exports = {
	  regisProduct,
		editProduct
  }