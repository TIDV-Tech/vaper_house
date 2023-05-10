const bcrypt = require('bcrypt')

const checkRegister = async (fullName, email, dateBirth, password) => {
  try {
    let message = {
      status: true,
      message: "There is no registered user",
      code: 200
    }

    let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let validatePass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!validateEmail.test(email) || !validatePass.test(password)) {
      message = {
        code: 200,
        status: true,
        message: "You have an error in your email or password, try again",
      }
    } else if (validateEmail.test(email) && validatePass.test(password)) {
      const pass = await bcrypt.hash(password, 10)

      message = {
        code: 200,
        status: true,
        message: "Successful user registration",
        data: {
          fullName: fullName,
          email: email,
          dateBirth: dateBirth,
          password: pass
        }
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

const checkLogin = async (email, password , info) => {
  try {
    let message = {
      status: true,
      message: "There is no registered user",
      code: 200
    }

    const user = info.find(u => u.email === email)

    

    if (user === undefined) {
      message = {
        code: 200,
        status: true,
        message: "Incorrect email or password",
      }
    }
    if (user) {
      const compPasword    = await bcrypt.compare(password, user.password)
      if (compPasword === false) {
        message = {
          code: 200,
          status: true,
          message: "Incorrect password",
        }
      }
      if (user && compPasword === true) {
        message = {
          success: true,
          message: "Correct, you are logged in",
          code: 200
        }
      } 
    }
    
    return message
  } catch (error) { 
    console.error(error)
    return {
      success: false,
      message: "Something went wrong...",
      code: 400
    }
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