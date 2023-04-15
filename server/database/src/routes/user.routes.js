import { Router }           from "express"
import { user_controller }  from "../controllers/user.controller.js"

const user_router = Router()

user_router.post(process.env.REGISTER_PATH, user_controller.saveUser)
user_router.get(process.env.USERS_PATH, user_controller.findUsers)

export { user_router }