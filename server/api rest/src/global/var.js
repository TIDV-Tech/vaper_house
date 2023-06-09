require('dotenv').config()

// SERVER
const URL                 = process.env.URL
const PORT                = process.env.PORT

// ROUTES
// - USER
const REGISTER            = process.env.REGISTER
const LOGIN               = process.env.LOGIN
const EDIT_USER           = process.env.EDIT_USER
const DELETE_USER         = process.env.DELETE_USER

// - PRODUCTS
const REG_PRO             = process.env.REG_PRO
const EDIT_PRO            = process.env.EDIT_PRO
const DELETE_PRO          = process.env.DELETE_PRO

// - PURCHASES
const GENERATE_PURCHASES  = process.env.GENERATE_PURCHASES

// - CATEGORIES
const REGISTER_CATEGORIES = process.env.REGISTER_CATEGORIES
const UPDATE_CATEGORY     = process.env.UPDATE_CATEGORY
const DELETE_CATEGORY     = process.env.DELETE_CATEGORY

// - ADDCAR
const ADDCAR              = process.env.ADD_CAR

// JSONWEBTOKEN
const KEY                 = process.env.KEY

// DATABASE
const CONNECT_DB          = process.env.CONNECT_DATABASE

module.exports = {
	URL, PORT,
	REGISTER, LOGIN, EDIT_USER, DELETE_USER,
	REG_PRO, EDIT_PRO, DELETE_PRO,
	GENERATE_PURCHASES, 
	REGISTER_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY,
	ADDCAR,
	KEY,
	CONNECT_DB
}