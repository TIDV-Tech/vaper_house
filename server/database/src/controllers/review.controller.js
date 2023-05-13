import { Review } from "../models/Reviews.js"

const review_controller = {}

review_controller.getReviews = async (req, res) => {
  try {
    let response = {
      msg: "Here's the reviews",
      data: [],
      status: 200
    }
    let reviews = await Review.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user_review"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product_review"
        }
      }
    ])
    if(!reviews.length){
      response.msg = "There's no reviews yet!"
      return res.status(response.status).json(response)
    }
    reviews = reviews.map(review => {
      const {_id, description, rating, createdAt, updatedAt, user_review, product_review} = review
      return {_id, description, rating, createdAt, updatedAt, user_review, product_review}
    })
    response.data = reviews
    return res.status(response.status).json(response)
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      error: error.message
    }
    return res.status(response.status).json(response)
  }
}

review_controller.registerReview = async(req, res) => {
  try {
    let response = {
      msg: "The review was created successfully",
      status: 201,
      data: {}
    }
    const data          = req.body
    const createdReview = await new Review(data).save()
    response.data       = createdReview
    res.status(response.status).json(response) 
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      error: error.message
    }
    return res.status(response.status).json(response)
  }
}

export { review_controller }