const bcrypt = require('bcrypt')

const checkRegister = async (fullName, email, dateBirth, password) => {
  try {
    let message = {
      status: true,
      message: "There is no registered user",
      code: 200
    }

    let validateEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
    let validatePass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/

    console.log(validateEmail.test(email))
    console.log(validatePass.test(password))

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
    if (email == "" || password == "") {
      message = {
        status: false,
        message: "Fields cannot be left empty",
        code: 202,
      }
    }
    if (user) {
      const compPasword = await bcrypt.compare(password, user.password)
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
    return {
      success: false,
      message: "Something went wrong...",
      code: 400
    }
  }
}

const editUser = async ( newData ) => {
	try {
    if ( newData.fullName == "" || newData.email == "" || newData.dateBirth == "" || newData.password == "" ) {
      let message = {
        status: false,
        message: "Fields cannot be left empty",
        code: 202,
      }

      return message
    }
    if (newData.password) {
      const pass = await bcrypt.hash(newData.password, 10)
      let message = {
        code: 200,
        status: true,
        message: "Successful user registration",
        data: {
          fullName: newData.fullName,
          email: newData.email,
          dateBirth: newData.dateBirth,
          password: pass
        }
      }

      return message
    }
	} catch (err) { 
    console.log(err)
  }
}

module.exports = {
  checkRegister,
  checkLogin,
  editUser
}