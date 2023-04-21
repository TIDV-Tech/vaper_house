import { Router }               from "express"
import { purchase_controller }  from "../controllers/purchase.controller.js"

const purchase_router = Router()

purchase_router.get(process.env.PURCHASE_PATH, purchase_controller.showPurchases)
purchase_router.post(process.env.REGISTER_PURCHASE_PATH, purchase_controller.registerPurchase)

export { purchase_router }