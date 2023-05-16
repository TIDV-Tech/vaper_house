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

category_controller.updateCategory = async (req, res) => {
  try {
    let response = {
      msg: "Updated successfully!",
      status: 200
    }
    const { categoryId, newData } = req.body
    await Category.findByIdAndUpdate(categoryId, newData)
    res.status(response.status).json(response) 
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      error: error.message
    }
    res.status(response.status).json(response) 
  }
}

category_controller.deleteCategory = async (req, res) => {
  try {
    let response = {
      msg: "Deleted successfully!",
      status: 200
    }
    const { categoryId } = req.body
    await Category.findByIdAndDelete(categoryId)
    res.status(response.status).json(response) 
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      error: error.message
    }
    res.status(response.status).json(response) 
  }
}

export { category_controller }

