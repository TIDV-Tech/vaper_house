require('dotenv').config()

// SERVER
const URL  = process.env.URL
const PORT = process.env.PORT

// ROUTES
const ROOT = process.env.ROOT

module.exports = {
	URL, PORT,
	ROOT
}