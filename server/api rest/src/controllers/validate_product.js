const regisProduct = ( tipo_producto, nombre, descripcion, marca,cantidad, precio, fecha_ingreso, img, param ) => {
  try {
    let message = {
      status: true,
      message: "There are no registered products",
      code: 200,
    }

    switch (param) {
      case "mayor":
        message = {
          status: true,
          message: "Product entered into wholesale sales",
          code: 200,
        }
        break

      case "detal":
        message = {
          status: true,
          message: "Product entered into retail sales",
          code: 200,
        }
        break
      default:
        message = {
          status: false,
          message: "There is an error in the product registration",
          code: 500,
        }
        break
    }

	/* 	const products = [
			tipo_producto,
      nombre,
      descripcion,
      marca,
      cantidad,
			precio,
      fecha_ingreso,
      img
		]

		const proSearch = (pro, col) => {
			return pro === col
		}

		const productSearch = products.find(product => (proSearch(product, col)))
		console.log(productSearch) */

		if (nombre == "") {
			console.log('no se pueden dejar campos vacíos')
		}

    /* if (cantidad > 10) {
      message = {
        status: true,
        message: "Product entered into wholesale sales",
        code: 200,
      }
    } else if (cantidad <= 10) {
      msg = {
        status: true,
        message: "Product entered into retail sales",
        code: 200,
      }
    } else {
      msg = {
        status: false,
        message: "There is an error in the product registration",
        code: 500,
      }
    } */
    return message
  } catch (err) {
    console.log(err)
  }
}

const editProduct = (product) => {
  try {
    console.log(product)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  regisProduct,
  editProduct,
}
