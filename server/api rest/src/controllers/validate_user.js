const bcrypt = require('bcrypt')
const axios  = require('axios')

const checkRegister = async (email, password) => {
  try {
    let message = {
      status: true,
      message: "There is no registered user",
      code: 200
    }
  
    let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let validatePass =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  
    if (validateEmail.test(email) && validatePass.test(password)) {
      message = {
        code: 200,
        status: true,
        message: "Successful user registration"
      }
    } else if (!validateEmail.test(email) || !validatePass.test(password)) {
      message = {
        code: 200,
        status: true,
        message: "You have an error in your email or password, try again",
      }
    } else {
      message = {
        code: 500,
        status: false,
        message: "Something went wrong..."
      }
    }
  
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err
      console.log(password)
      console.log(`Esta es la password hasheada: ${hash}`)
    })
  
    return message
  } catch (err) { console.log(err) }
}

const checkLogin = async (correo, email, password) => {
  try {
    let message = {
      status: true,
      message: "There is no registered user",
      code: 200
    }
  
    const searchUsersEmail = (cor, email, password) => {
      return cor.cor_elec === email && cor.clave === password
    }
  
    let cor_find = correo.find(cor => searchUsersEmail(cor, email, password))
    
    if (cor_find == undefined) { 
      message = {
        code: 200,
        status: false,
        message: "Wrong email or password"
      }
    } else if (cor_find) {
      if (email == cor_find.cor_elec){
        message = {
          code: 200,
          status: true,
          message: "Correct, you are logged in"
        }
      } 
      if (password == cor_find.clave) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err
          bcrypt.compare(password, hash, (err, comp) => {
            if (err) throw err
            console.log(`Esta es la password hasheada: ${hash}`)
          })
        })
      } 
    } else {
      message = {
        code: 200,
        status: false,
        message: "You are not registered"
      }
    }
  
    return message
  } catch (err) { console.log(err) }
}

module.exports = {
  checkRegister,
  checkLogin,
}
