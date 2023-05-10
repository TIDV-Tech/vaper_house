import { User }   from "../models/User.js"
import { Cart }   from "../models/Cart.js"

const user_controller = {}

user_controller.saveUser = async (req, res) => {
  try {
    let response = {
      msg: "User registered successfully!",
      status: 201,
      data: {}
    }
    const data = req.body
    const newUser = new User(data)
    const savedUser = await newUser.save()
    const cartAdded = await new Cart({_id: savedUser._id}).save()
    response.data = {savedUser, cartAdded}
    return res.status(response.status).json(response)
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      error: error.message
    }
    res.status(response.status).json(response)  
  }
}

user_controller.findUsers = async (req, res) => {
  try {
    let response = {
      msg: "There's no users yet!",
      status: 200,
      data: []
    }
    const users = await User.find().lean()
    if(!users.length){
      return res.status(response.status).json(response)
    }
    response.msg = "Here's the users"
    response.data = users
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

user_controller.findById = async(req, res) => {
  try {
    let response = {
      msg: "Here's the user",
      status: 200,
      data: {}
    }
    const { userId } = req.body
    const user       = await User.findById(userId)
    if(!user){
      response = {
        msg: "user not found",
        status: 400,
        data: {}
      }
      return res.status(response.status).json(response)
    }
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

user_controller.findByFilter = async (req, res) => {
  try {
    let response = {
      msg: "Users not found!",
      status: 200,
      data: []
    }
    const {filter} = req.body
    const users = await User.find(filter)
    if(!users.length){
      res.status(response.status).json(response)
    }
    response.msg = "Here's the users"
    response.data = users
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

user_controller.updateUser = async (req, res) => {
  try {
    let response = {
      msg: "Updated successfully!",
      status: 200
    }
    const { userId, newData } = req.body
    await User.findByIdAndUpdate(userId, newData)
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

user_controller.deleteUser = async (req, res) => {
  try {
    let response = {
      msg: "Deleted successfully!",
      status: 200
    }
    const { userId } = req.body
    await User.findByIdAndDelete(userId)
    await Cart.findByIdAndDelete(userId)
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

export {user_controller}