import { Router }               from "express"
import { purchase_controller }  from "../controllers/purchase.controller.js"

const purchase_router = Router()

purchase_router.get(process.env.PURCHASES_PATH, purchase_controller.showPurchases)
purchase_router.post(process.env.REGISTER_PURCHASE_PATH, purchase_controller.registerPurchase)
purchase_router.post(process.env.PURCHASE_BY_FILTER_PATH, purchase_controller.findByFilter)

export { purchase_router }