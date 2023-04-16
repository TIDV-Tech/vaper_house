import { Router }               from "express"
import { product_controller }   from "../controllers/product.controller.js"

const product_router = Router()

product_router.get(process.env.PRODUCTS_PATH, product_controller.findProducts)

product_router.post(process.env.REGISTER_PRODUCT_PATH, product_controller.saveProduct)
product_router.post(process.env.PRODUCT_BY_NAME_PATH, product_controller.findProductsByName)
product_router.post(process.env.UPDATE_PRODUCT_PATH, product_controller.updateProduct)
product_router.post(process.env.DELETE_PRODUCT_PATH, product_controller.deleteProduct)

export { product_router }