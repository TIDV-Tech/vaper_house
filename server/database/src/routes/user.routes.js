import { Router }           from "express"
import { user_controller }  from "../controllers/user.controller.js"

const user_router = Router()

user_router.get(process.env.USERS_PATH, user_controller.findUsers)

user_router.post(process.env.REGISTER_USER_PATH, user_controller.saveUser)
user_router.post(process.env.UPDATE_USER_PATH, user_controller.updateUser)
user_router.post(process.env.DELETE_USER_PATH, user_controller.deleteUser)

export { user_router }