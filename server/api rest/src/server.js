const express = require('express')
const cors    = require('cors')
const _var    = require('./global/var.js')
const root    = require('./routes/root.routes.js')
const app     = express()

app.use(express.json())
app.use(cors())
app.use(root)

app.listen(_var.PORT, (err) => {
	if (err) throw err
	console.log(`Server running on ${_var.URL + _var.PORT}`)
})