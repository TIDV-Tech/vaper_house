const fs = require("fs")

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

        fs.writeFileSync("car.json", JSON.stringify(prueba), (err) => {
          if (err) throw err
          console.log('Informacion ingresada exitosamente')
        })
      }
    })
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
}

const carValidate = () => {
	
}

module.exports = {
  addCar,
  carValidate
}