import { Router }             from "express"
import { review_controller }  from "../controllers/review.controller.js"

const review_router = Router()

review_router.get(process.env.REVIEWS_PATH, review_controller.getReviews)
review_router.post(process.env.REGISTER_REVIEW_PATH, review_controller.registerReview)

export { review_router }