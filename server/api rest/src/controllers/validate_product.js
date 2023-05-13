const regisProduct = ( tipo_producto, nombre, descripcion, marca, cantidad, color, nicotine, flavor, precio, promocion, param ) => {
  try {
    let message = {
      status: true,
      message: "There are no registered products",
      code: 200,
    }

    switch (param) {
      case "mayor":
        if ( tipo_producto == "" || nombre == "" || descripcion == "" || marca == "" || cantidad == "" || precio == "" || promocion == ""  ) {
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
        if ( tipo_producto == "" || nombre == "" || descripcion == "" || marca == "" || cantidad == "" || color == "" || nicotine == "" || flavor == "" || precio == "" || promocion == "" ) {
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

const editProducts = ( newData ) => {
  try {
    if ( newData.name == "" || newData.description == "" || newData.type == "" || newData.brand == "" || newData.color == "" || newData.nicotine == "" || newData.flavor == "" || newData.img == "" || newData.quantity == "" || newData.price == "" || newData.promotionPrice == "" ){
      let message = {
        status: false,
        message: "Fields cannot be left empty",
        code: 202,
      }

      return message 
    }
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
  editProducts,
}
