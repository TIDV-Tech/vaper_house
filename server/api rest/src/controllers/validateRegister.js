let msg = {
	status: false,
	message: "Error retrieving data",
	data: [],
	code: 500
}

const checkRegister = (name, email , password) =>{
	
	let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	let validatePass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/


  	if(validateEmail.test(email) && validatePass.test(password)){
    	msg = {
			status: true,
			message: "Succesfully",
			code: 200
		}
	}else if(!validateEmail.test(email) || !validatePass.test(password)){
		msg = {
			status: false,
			message: "Estas equivocado",
			code: 500
		}
	}

	return msg
}

module.exports = {
 	checkRegister
}