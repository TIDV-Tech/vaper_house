import "dotenv/config"
import express            from "express"
import { user_router }    from "./routes/user.routes.js"
import { product_router } from "./routes/product.routes.js"

//Config
import "./database/mongoDB.connection.js"

const app = express()

const port = process.env.PORT
const url = process.env.URL_DEV

app.use(express.json())
app.use(user_router)
app.use(product_router)

app.listen(port, () => console.log(`DB microservice running on ${url}:${port}`))