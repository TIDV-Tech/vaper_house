const bcrypt = require('bcrypt')

const checkRegister = async (fullName , email , dateBirth, password) => {
  try {
    let message = {
      status: true,
      message: "There is no registered user",
      code: 200
    }
  
    let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let validatePass  = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  
    if (!validateEmail.test(email) || !validatePass.test(password)) {
      message = {
        code: 200,
        status: true,
        message: "You have an error in your email or password, try again",
      } 
    } else if (validateEmail.test(email) && validatePass.test(password)) {
      //console.log('eo')
      const hashP = bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err
        console.log('hola')
      })
      console.log(hashP)

      message = {
        code: 200,
        status: true,
        message: "Successful user registration",
        //data: `email: ${email}, password: ${hash}`
      }
      } 

      console.log(message)
    return message
  } catch (err) { 
    let message = {
      msg: "Something went wrong...",
      status: 400,
      error: err.message
    }
    return message
  }
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
  } catch (err) { 
    let message = {
      msg: "Something went wrong...",
      status: 400,
      error: err.message
    }
    return message
  }
}

const editUser = ( id_user , fullname , email , dateBirth , password , info ) => {
	try {
    let message = {
      status: true,
      message: "There is no registered user",
      code: 200
    }

    const info = {
      id_user,
      fullname,
      email,
      dateBirth,
      password,
    }

    if (id_user == "" || fullname == "" || email == "" || dateBirth == "" || password == "") {
      message = {
        status: false,
        message: "Fields cannot be left empty",
        code: 202,
      }
    }
    if(id_user != info.id_user){
      message = {
        status: false,
        message: "This user does not exist",
        code: 202,
      }
    }
    else{
      message = {
        status: true,
        message: "The user has been successfully edited",
        code: 200,
        data: info
      }
    }

    return message
	} catch (err) { console.log(err) }
}

module.exports = {
  checkRegister,
  checkLogin,
  editUser
}
