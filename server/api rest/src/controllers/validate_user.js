let msg = {
  status: false,
  message: "Error retrieving data",
  data: [],
  code: 500,
}

const checkRegister = (name, email, password) => {
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
  return msg
}

const checkLogin = (email, password) => {
  let valores  = [ email, password ]
  for (i = 0; i < valores.length; i++) {
    const res = valores[i]
    if (res === valores[0]) {
      msg = {
        status: true,
        message: "Log in succesfully",
        code: 200,
      }
    } else if (res != valores) {
      msg = {
        status: false,
        message: "An error has occurred",
        code: 500,
      }
    }
  }
  return msg
}

const comparate = () => {
  let x = checkRegister()
  let y = checkLogin()
  console.log(x)
  console.log(y)
  if (y === x) {
    msg = {
      status: true,
      message: "por fin funciona esta mamada",
      code: 200
    }
  } else if(y != x) {
    msg = {
      status: false,
      message: "sigue sin funcionar esta mierda",
      code: 500
    }
  }
  return msg
}

module.exports = {
  checkRegister,
  checkLogin,
}
