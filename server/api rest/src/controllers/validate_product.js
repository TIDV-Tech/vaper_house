const regisProduct = ( tipo_producto, nombre, descripcion, marca,cantidad, precio, fecha_ingreso, img, param ) => {
  try {
    let message = {
      status: true,
      message: "There are no registered products",
      code: 200,
    }

    switch (param) {
      case "mayor":
        if ( tipo_producto == "" || nombre == "" || descripcion == "" || marca == "" || cantidad == "" || precio == "" || fecha_ingreso == "" || img == "" ) {
          message = {
            status: false,
            message: "Fields cannot be left empty",
            code: 202,
          }
        } else {
          message = {
            status: true,
            message: "Product entered into wholesale sales",
            code: 200,
          }
        }
        break

      case "detal":
        if ( tipo_producto == "" || nombre == "" || descripcion == "" || marca == "" || cantidad == "" || precio == "" || fecha_ingreso == "" || img == "" ) {
          message = {
            status: false,
            message: "Fields cannot be left empty",
            code: 202,
          }
        } else {
          message = {
            status: true,
            message: "Product entered into retail sales",
            code: 200,
          }
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

    return message
  } catch (err) {
    let message = {
      msg: "Something went wrong...",
      status: 400,
      error: err.message,
    }
    return message
  }
}

const editProduct = ( id_product, tipo_producto, nombre, descripcion,marca, cantidad, precio, img, fecha_ingreso, product ) => {
  try {
    let message = {
      status: true,
      message: "There are no registered products",
      code: 200,
    }

    const product = {
      id_product,
      tipo_producto,
      nombre,
      descripcion,
      marca,
      cantidad,
      precio,
      img,
      fecha_ingreso
    }

    if ( id_product == "" || tipo_producto == "" || nombre == "" || descripcion == "" || marca == "" || cantidad == "" || precio == "" || fecha_ingreso == "" || img == "" ){
      message = {
        status: false,
        message: "Fields cannot be left empty",
        code: 202,
      }
    }
    if (id_product != product.id_product) {
      message = {
        status: false,
        message: "This product does not exist",
        code: 202,
      }
    } else {
      message = {
        status: true,
        message: "The product has been successfully modified",
        code: 200,
        data: product
      }
    }

    return message
  } catch (err) {
    let message = {
      msg: "Something went wrong...",
      status: 400,
      error: err.message,
    }
    return message
  }
}

module.exports = {
  regisProduct,
  editProduct,
}
