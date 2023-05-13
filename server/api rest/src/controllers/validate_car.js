const carValidate = (car, productId, quantityProducts) => {
  try {
    let message = {
      code: 200,
      status: true,
      msg: "There are no registered products",
    }

    if (productId === car._id && quantityProducts > car.quantity) {
      message = {
        code: 202,
        status: false,
        msg: "This product is out of stock",
      }
    } else if (productId === car._id && quantityProducts <= car.quantity) {
      let cant = quantityProducts - car.quantity
      console.log(cant)
      message = {
        code: 200,
        status: true,
        msg: "Product added to shopping cart successfully",
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

module.exports = { carValidate }
