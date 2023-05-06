const express = require('express')
const cors    = require('cors')
const _var    = require('./global/var.js')
const user    = require('./routes/user.routes.js')
const product = require('./routes/product.routes.js')
const addCar  = require('./routes/addCar.routes.js')    
const app     = express()

app.use(express.json())
app.use(cors({
	origin: 'http://localhost:5001'
}))
app.use(user)
app.use(product)
app.use(addCar)

app.listen(_var.PORT, (err) => {
	if (err) throw err
	console.log(`Server running on ${_var.URL + _var.PORT}`)
})