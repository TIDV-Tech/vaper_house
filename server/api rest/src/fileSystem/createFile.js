const funct = require('../controllers/validate_car.js')

const carValidate = (id_product, product, cant_prod, obj) => {
  try {
    let message = {
      code: 200,
      status: true,
      msg: "There are no registered products"
    }
  
    function searchProd(prod , id_product){
      return prod.id === id_product
    }
  
    let prod_find = product.find(prod => searchProd(prod, id_product))
   
    if(!prod_find){
      message = {
        code: 200,
        status: true, 
        msg: "Product not found" 
      }
    } else if(cant_prod > prod_find.cantidad){
      message = { 
        code: 200,
        status: false, 
        msg: "This quantity of products is not found" 
      }
    } else if(prod_find && cant_prod <= prod_find.cantidad){
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
    }
  
    return message
  } catch (err) { throw err }
}

module.exports = { carValidate }