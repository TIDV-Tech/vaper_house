const { Router } = require('express')
const _var       = require('../global/var.js')
const controller = require('../controllers/validate_user.js')
const axios      = require('axios')
const router     = Router()

router.get(_var.ROOT, (req, res) => {
	res.send("Hello World")	
})

router.post(_var.REGISTER, async (req, res) => {
	try {
		const { userId, fullName , email , dateBirth, password } = req.body

		const validate = await controller.checkRegister( fullName , email , dateBirth, password )
		res.status(validate.code).json(validate)

		const info = await axios.post('http://localhost:5001/register/user', {
			userId: userId,
		 	fullName: validate.data.fullName, 
		 	email: validate.data.email,  
		 	dateBirth: new Date(validate.data.dateBirth),
		 	password: validate.data.password
		 })
		 console.log(info) 
	
	} catch (err) { 
		console.log(err)
	}
})

router.post(_var.LOGIN, async (req, res) => {
	try {
		const { email, password } = req.body

		const response = await axios.get('http://localhost:5001/users', {
			params: {
				email: email,
				password: password
			}
		})

		let info = response.data.data

		let validateUser = await controller.checkLogin(email, password , info)
		res.status(validateUser.code).json(validateUser)
	} catch (err) { 
		console.log(err) 
		res.status(500).json({ message: 'Error in the request to the registration API' })
	}
})

router.get(_var.VIEW_ALL_USER, async (req, res) => {
	try {
    const users = await axios.get('http://localhost:5001/users')
		.then((result) => {
			res.send(users.data)
		})
		.catch((err) => { console.log(err) })
  } catch (err) { console.log(err) }
})

router.post(_var.VIEW_USER, async (req, res) => {
	try {
    
  } catch (err) { console.log(err) }
})


router.post(_var.EDIT_USER, async (req, res) => {
	try {
		const { userId, newData } = req.body 
		const obj = {
		  userId,
			newData
		}
		
		const editUser = await axios.post('http://localhost:5001/update/user', obj)
		.then((result) => {
			res.send({ "msg": "Updated successfully!", "status": 200, "data": obj })
		}).catch((err) => {
			console.log(err)
		})
		/* let user = await controller.editUser( id_user , fullname, email, dateBirth, password , info )
		res.send(user) */
	  } catch (err) { console.log(err) }	
})

router.get(_var.DELETE_USER, async (req, res) => {
	try {
		const { userId } = req.body
		const deleteUser = await axios.post('http://localhost:5001/delete/user', { userId })
		.then((result) => {
      res.send({ "msg": "Deleted successfully!", "status": 200, "data": userId })
    }).catch((err) => {
      console.log(err)
    })
	} catch (err) { console.log(err) }
})

module.exports = router