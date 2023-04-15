import { Router }               from "express"
import { product_controller }   from "../controllers/product.controller.js"

const product_router = Router()

product_router.post(process.env.SAVE_PRODUCT_PATH, product_controller.saveProduct)
product_router.get(process.env.FIND_PRODUCTS_PATH, product_controller.findProducts)

export { product_router }