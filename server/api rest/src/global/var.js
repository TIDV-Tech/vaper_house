require('dotenv').config()

// SERVER
const URL                = process.env.URL
const PORT               = process.env.PORT

// ROUTES
// - USER
const ROOT               = process.env.ROOT
const REGISTER           = process.env.REGISTER
const LOGIN              = process.env.LOGIN

const VIEW_USER          = process.env.VIEW_USER
const VIEW_ALL_USER      = process.env.VIEW_ALL_USER
const EDIT_USER          = process.env.EDIT_USER
const DELETE_USER        = process.env.DELETE_USER

// - PRODUCTS
const REG_PRO            = process.env.REG_PRO
const VIEW_PRO           = process.env.VIEW_PRO
const VIEW_ALL_PRO       = process.env.VIEW_ALL_PRO
const EDIT_PRO           = process.env.EDIT_PRO
const DELETE_PRO         = process.env.DELETE_PRO

// - PURCHASES
const GENERATE_PURCHASES = process.env.GENERATE_PURCHASES
const GENERATE_INVOICE   = process.env.GENERATE_INVOICE

// - ADDCAR
const ADDCAR             = process.env.ADD_CAR

// JSONWEBTOKEN
const KEY                = process.env.KEY

module.exports = {
	URL, PORT,
	ROOT, REGISTER, LOGIN, 
	VIEW_USER, VIEW_ALL_USER,EDIT_USER, DELETE_USER,
	REG_PRO, VIEW_PRO, VIEW_ALL_PRO,EDIT_PRO, DELETE_PRO,
	GENERATE_PURCHASES, GENERATE_INVOICE,
	ADDCAR,
	KEY
}