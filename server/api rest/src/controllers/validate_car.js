const carValidate = (car, productId, quantityProducts) => {
  try {
    let message = {
      code: 200,
      status: true,
      msg: "There are no registered products"
    }

    for (let i = 0; i < car.length; i++) {
      const e = car[i]
      console.log(e.quantity)
      if (productId === e._id && quantityProducts > e.quantity) {
        message = {
          code: 200,
          status: false,
          msg: `This quantity of products is not found ${e.name}}`
        }
      } else if(productId === e._id && quantityProducts <= e.quantity) {
        let cant = quantityProducts - e.quantity
        if (cant > 0) {
          console.log('no')
        } 
        message = {
          code: 200,
          status: true,
          msg: "Product added to shopping cart successfully"
        }
      }
    }

    /* function searchProd(prod , car){
      return prod.quantity === car
    }
  
    let prod_find = car.find(prod => searchProd(prod, car))
    console.log(prod_find) */
   
    /* if(!prod_find){
      message = {
        code: 200,
        status: true, 
        msg: "Product not found" 
      }
    } else if( quantityProducts < car.quantity ){
      /* message = { 
        code: 200,
        status: false, 
        msg: "This quantity of products is not found" 
      } 
      console.log('no')
    } /*else if (prod_find && cant_prod <= prod_find.cantidad){
      message = { 
        code: 200,
        status: true, 
        msg: `The product has been found id_prod: ${prod_find.id}, cant_prod: ${prod_find.cantidad}`
      }

    }else{
      message = {
        code: 500,
        status: false,
        msg: "Something went wrong"
      }
    }*/
  
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