const fs   = require("fs")
const jwt  = require("jsonwebtoken")
const _var = require("../global/var.js")

const addCar = (obj) => {
  try {
    const exists = fs.existsSync("car.json")

    if (exists) {
      fs.readFile("car.json", "utf-8", (err, data) => {
        if (err) {
          console.log("error: ", err)
        } else {
          let prueba = JSON.parse(data)
  
          jwt.verify(prueba, _var.KEY, function (err, decoded) {
            if (err) throw err
            let new_info = obj.info[0]
  
            let info = decoded.info[0]
            const send = decoded.info.push(new_info)
  
            jwt.sign(decoded, _var.KEY, { algorithm: "HS256" }, (err, token) => {
              if (err) throw err
  
              fs.writeFileSync("car.json", JSON.stringify(token), (err) => {
                if (err) throw err
                console.log("Informacion ingresada exitosamente")
                console.log(token)
  
              })
              jwt.verify(token, _var.KEY, function (err, decoded) {
                if (err) throw err
                console.log(decoded)
              })
            })
          })
  
        }
      })
    } else if (!exists) {
      console.log(obj.info[0])
      jwt.sign(obj, _var.KEY, { algorithm: "HS256" }, (err, token) => {
        if (err) throw err
        fs.writeFileSync("car.json", JSON.stringify(token), (err) => {
          if (err) throw err
          console.log(info)
        })
        
      })
      return obj
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

module.exports = { addCar }