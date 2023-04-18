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
  const valores  = { email, password }
  const arrValue = [valores]
	const countArr = arrValue.push(...[valores])
	console.log(countArr)

  for (i = 0; i < arrValue.length; i++) {
    const res = arrValue[i]
		console.log(res)
    if (res === arrValue) {
      msg = {
        status: true,
        message: "Log in succesfully",
        code: 200,
      }
    } else if (res != arrValue) {
      msg = {
        status: false,
        message: "An error has occurred",
        code: 500,
      }
    }
  }
  return msg
}

module.exports = {
  checkRegister,
  checkLogin,
}
