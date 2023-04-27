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

const checkLogin = (correo, email) => {
  for (i = 0; i < correo.length; i++) {
    const e = correo[i]
    if (e != email) {
      console.log('No estas registrado')
    } else if (e == email) { console.log(`Correcto ${email}`) }
    //console.log(e == email)
    //console.log(email)
  }
}

module.exports = {
  checkRegister,
  checkLogin,
}
