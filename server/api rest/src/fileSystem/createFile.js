const fs   = require("fs")
const jwt  = require('jsonwebtoken')
const _var = require('../global/var.js')

const addCar = (obj) => {
  const exists = fs.existsSync("car.json")

  if (exists) {
    fs.readFile("car.json", "utf-8", (err, data) => {
      if (err) {
        console.log("error: ", err)
      } else { 
        let prueba = JSON.parse(data) 
				let info   = prueba.info[0]
        const send = prueba.info.push(info)

        //jwt.sign(obj, _var.KEY, {algorithm: 'HS256'}, (err, token) => {
          //if (err) throw err
          
          fs.writeFileSync("car.json", JSON.stringify(prueba), (err) => {
            if (err) throw err
            console.log('Informacion ingresada exitosamente')
            //console.log(token)
          })
        //})
        
      }
    })
  } else if (!exists) {
    fs.writeFileSync("car.json", JSON.stringify(obj), (err) => {
      if (err) throw err
      console.log(info)
    })

    return obj
  }
}

const carValidate = (id_product, product, cant_prod) => {
   for (i = 0; i < product.length; i++) {
    const pro = product[i]
    if (id_product == pro.id) { console.log('Producto encontrado') } 
    else if (id_product != pro.id) { console.log('Producto no registrado') } 
    if (cant_prod <= pro.cantidad) { 
      let rest = cant_prod - pro.cantidad
      if (rest == 0) {
        let p = id_product
        console.log(`Producto agotado ${p}`)
        if (p == rest) { console.log('Producto no disponible') }
      } 
    }
    else if (cant_prod > pro.cantidad) { console.log('No hay esta cantidad de este producto') }
    else { console.log('Error') }
   }
}

module.exports = {
  addCar,
  carValidate
}