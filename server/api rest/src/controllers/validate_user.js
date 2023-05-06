const bcrypt = require('bcrypt')
const axios  = require('axios')

let msg = {
  status: false,
  message: "Error retrieving data",
  data: [],
  code: 500,
}

const checkRegister = async (name, email, password) => {
  let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let validatePass =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  if (validateEmail.test(email) && validatePass.test(password)) {
    msg = {
      status: true,
      message: "User registered succesfully",
      code: 200,
    }
  } else if (!validateEmail.test(email) || !validatePass.test(password)) {
    msg = {
      status: false,
      message: "An error has occurred",
      code: 500,
    }
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err
    console.log(password)
    console.log(`Esta es la password hasheada: ${hash}`)
  })

  return msg
}

const checkLogin = async (correo, email, password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err
    bcrypt.compare(password, hash, (err, comp) => {
      if (err) throw err
      console.log(`Comparacion exitosa: ${comp}`)
      if (comp == true) console.log('Has iniciado sesion')
      else console.log('Tienes un error, vuelve a intentarlo') 
    })
    
    console.log(password)
    console.log(`Esta es la password hasheada: ${hash}`)
  })

  for (i = 0; i < correo.length; i++) {
    const e = correo[i]
    if (e != email) {
      console.log('No estas registrado')
    } else if (e == email) { console.log(`Correcto ${email}`) }
  }
}

module.exports = {
  checkRegister,
  checkLogin,
}
