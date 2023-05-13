import { Category } from "../models/Category.js"
const category_controller = {}

category_controller.getCategories = async (req, res) => {
  try {
    let response = {
      msg: "Here's the categories",
      status: 200,
      data: []
    }
    const categories = await Category.find()
    if(!categories.length){
      response.msg = "There's no categories yet!"
      return res.status(response.status).json(response)
    }
    response.data = categories
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

category_controller.registerCategory = async(req, res) => {
  try {
    let response = {
      msg: "Registered successfully!",
      status: 201,
      data: {}
    }
    const data      = req.body
    const category  = await new Category(data).save()
    response.data   = category
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

export { category_controller }

