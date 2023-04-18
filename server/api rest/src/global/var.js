require('dotenv').config()

// SERVER
const URL  = process.env.URL
const PORT = process.env.PORT

// ROUTES
const ROOT     = process.env.ROOT
const REGISTER = process.env.REGISTER
const LOGIN    = process.env.LOGIN

module.exports = {
	URL, PORT,
	ROOT, REGISTER, LOGIN
}