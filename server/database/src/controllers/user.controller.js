import { User }   from "../models/User.js"

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
    response.data = savedUser
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

user_controller.findUsers = async (req, res) => {
  try {
    let response = {
      msg: "There's no users yet!",
      status: 200,
      data: []
    }
    const users = await User.find().lean()
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