import { Router }           from "express"
import { cart_controller }  from "../controllers/cart.controller.js"
const cart_router = Router()

cart_router.get(process.env.CART_PATH, cart_controller.getCartContent)
cart_router.post(process.env.ADD_CART_PATH, cart_controller.addToCart)
cart_router.post(process.env.REMOVE_CART_PATH, cart_controller.removeToCart)
cart_router.post(process.env.EMPTY_CART_PATH, cart_controller.emptyCart)

export { cart_router }