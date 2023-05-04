const funct = require('../controllers/validate_car.js')

const carValidate = (id_product, product, cant_prod, obj) => {
  for (i = 0; i < product.length; i++) {
    const pro = product[i]
    
    /* const product  = [
			{id: 1, cantidad: 10},
			{id: 2, cantidad: 12},
			{id: 3, cantidad: 13},
			{id: 4, cantidad: 14}
		] */

    if (id_product != pro.id) {
      console.log("Producto no registrado")
    }
    if (cant_prod > pro.cantidad) {
      console.log("No hay esta cantidad de este producto")
    } 
    if (cant_prod > pro.cantidad && id_product == pro.id) {
      console.log('Error')
    }
    if (cant_prod <= pro.cantidad && id_product != pro.id) {
      console.log('Error 2')
    }
    if (cant_prod > pro.cantidad && id_product != pro.id) {
      console.log('Error 3')
    }
    /*  if (id_product == pro.id) { 
      funct.addCar(obj) 
      console.log('lgf')
    } */   
    if (cant_prod <= pro.cantidad && id_product == pro.id) {
      funct.addCar(obj)
      console.log('Producto añadido exitosamente')
      /* let rest = cant_prod - pro.cantidad

      if (rest == 0) {
        let p = id_product
        console.log(`Producto agotado ${p}`)
        if (p <= rest) {
          
        }
      }
    }  else {
      console.log("Error")*/
    } 
  }
}


module.exports = { carValidate }