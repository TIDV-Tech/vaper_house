import { Router }               from "express"
import { category_controller }  from "../controllers/category.controller.js"

const category_router = Router()

category_router.get(process.env.CATEGORIES_PATH, category_controller.getCategories)
category_router.post(process.env.REGISTER_CATEGORY_PATH, category_controller.registerCategory)
category_router.post(process.env.UPDATE_CATEGORY_PATH, category_controller.updateCategory)
category_router.post(process.env.DELETE_CATEGORY_PATH, category_controller.deleteCategory)

export { category_router }

