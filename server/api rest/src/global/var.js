require('dotenv').config()

// SERVER
const URL  = process.env.URL
const PORT = process.env.PORT

// ROUTES
// - USER
const ROOT     = process.env.ROOT
const REGISTER = process.env.REGISTER
const LOGIN    = process.env.LOGIN

// - PRODUCTS
const REG_PRO = process.env.REG_PRO

// - ADDCAR
const ADDCAR = process.env.ADD_CAR

// JSONWEBTOKEN
const KEY = process.env.KEY

module.exports = {
	URL, PORT,
	ROOT, REGISTER, LOGIN,
	REG_PRO,
	ADDCAR,
	KEY
}