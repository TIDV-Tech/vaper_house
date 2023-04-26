const fs = require("fs")

let msg = {
  status: false,
  message: "Error retrieving data",
  data: [],
  code: 500,
}

const addCar = (obj) => {
  let car = ""
  switch (obj.type) {
    case "json":
      let l = obj.info
      for (i = 0; i < l.length; i++) {
        car = obj.info[i]
        if (i < l.length - 1) car += ","
      }
      break

    default:
      car = {
        status: false,
        message: "Has enviado un objeto invalido, sólo se permite de tipo json",
      }
      break
  }

  /* const products = [
		{id: 1, name: "vaily"},
		{id: 2, name: "bjorn"}, 
		{id: 3, name: "no sé"},
		{id: 4, name: "npi"}
	]
	const search = products.map((prod) => { return `id: ${prod.id}, name: ${prod.name}` })
	if (products[0].id) console.log('Correcto, si existe')
	else if (!products[0].id) console.log('Nay')
	else return 'Este producto no existe' */

  const exists = fs.existsSync("car.json")
  if (exists) {
    fs.appendFileSync("car.json", JSON.stringify(obj))
    console.log("Datos ingresados exitosamente")
  } else if (!exists) {
    /* const value = JSON.stringify(obj)
			const salto = () => value.split(/\r\n|\r|\n/,-1)
			const val   = JSON.parse(value) */

    fs.writeFileSync("car.json", JSON.stringify(obj), (err) => {
      if (err) throw err
      console.log(info)
    })

    return obj
  }
	return msg
}

const productCar = () => {}

module.exports = {
  addCar,
  productCar,
}
