let msg = {
	status: false,
	message: "Error retrieving data",
	data: [],
	code: 500,
  }
  
  const regisProduct = (tipo_producto , nombre , descripcion , marca , cantidad,  precio ,fecha_ingreso , img) => {
	try {
		if(cantidad > 10){
			msg = {
				status: true,
				message: "Producto ingresado a las ventas al mayor",
				code: 200
			}
		} else if(cantidad <= 10) {
			msg = {
				status: true,
				message: "Producto ingresado a las ventas al detal",
				code: 200
			}
		} else {
			msg = {
				status: false,
				message: "Hay un error en el registro del producto",
				code: 500
			}
		}
		return msg
	} catch (err) { throw err }  
  }
  
  module.exports = {
	  regisProduct
  }