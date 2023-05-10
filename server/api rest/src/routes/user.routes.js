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
    const { fullName, email, dateBirth, password } = req.body
		console.log({ fullName, email, dateBirth, password })
    const users = await axios.get(`${_var.CONNECT_DB}users`)
		const inf   = users.data.data

		const user = inf.find(u => u.email === email)
		if (user) {
			res.status(400).json({ message: 'Email already exists' })
		} else {
			const validate = await controller.checkRegister( fullName , email , dateBirth, password )
			console.log(validate)
			const info = await axios.post(`${_var.CONNECT_DB}register/user`, {
				fullName: validate.data.fullName,
				email: validate.data.email,
				dateBirth: new Date(validate.data.dateBirth),
				password: validate.data.password
			})
			res.status(validate.code).json(validate)
		}
  } catch (err) {
    handleError(err, res)
  }
})

async function handleError(err, res) {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
}

router.post(_var.LOGIN, async (req, res) => {
	try {
		const { email, password } = req.body

		const response = await axios.get(`${_var.CONNECT_DB}users`, {
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
    const users = await axios.get(`${_var.CONNECT_DB}users`)
		.then((result) => {
			res.send(result.data)
		})
		.catch((err) => { console.log(err) })
  } catch (err) { console.log(err) }
})

router.post(_var.VIEW_USER, async (req, res) => {
	try {
    const { filter } = req.body

		const user = await axios.post(`${_var.CONNECT_DB}user`, { filter })
		.then((result) => {
			res.send(result.data)
		})
		.catch((err) => {
			console.log(err)
		})
  } catch (err) { console.log(err) }
})

router.post(_var.EDIT_USER, async (req, res) => {
	try {
		const { userId, newData } = req.body 
		
		const edit = await controller.editUser(newData)
		if (edit.code === 202) {
			res.send(res.status(edit.code).json(edit))
		} else if(edit.code === 200) {
			const editUser = await axios.post(`${_var.CONNECT_DB}update/user`, {
			userId: userId,
      newData: {
				fullName: edit.data.fullName,
        email: edit.data.email,
        dateBirth: new Date(edit.data.dateBirth),
        password: edit.data.password
			}
		})
		.then((result) => {
			res.send({
				msg: result.data.msg, 
				status: result.data.status, 
				data: edit.data
			})
		})
		.catch((err) => {
			console.log(err)
		})
		}

	} catch (err) { console.log(err) }	
})

router.get(_var.DELETE_USER, async (req, res) => {
	try {
		const { userId } = req.body
		const deleteUser = await axios.post(`${_var.CONNECT_DB}delete/user`, { userId })
		.then((result) => {
			console.log(result)
      res.send({
				msg: result.data.msg,
				status: result.data.status,
				data: userId
			})
    }).catch((err) => { console.log(err) })
	} catch (err) { console.log(err) }
})

module.exports = router