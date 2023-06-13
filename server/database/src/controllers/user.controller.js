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
    const users = await User.paginate({}, {page: 1, limit: 5})

    if(!users.docs.length){
      return res.status(response.status).json(response)
    }
    response.msg = "Here's the users"
    response.data = users.docs
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
    response.data = user
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
    const {filter}    = req.body
    let foundUsers = []
    if(filter.length){
      filter.map((elm,key) => {
        let k = Object.keys(elm)
        let m = filter[key][k]
        let c = new RegExp('^'+m+'$')
        filter[key][k] = c
      })
      foundUsers = await User.paginate({"$or": filter}, {page: 1, limit: 5})
    }else{
      if(typeof Object.values(filter)[0] == "string"){
        let k = Object.keys(filter)
        let m = filter[k]
        let c = new RegExp(m)
        filter[k] = c
        k = k[0]
        foundUsers = await User.paginate({[k]: {$regex: c}}, {page: 1, limit: 5})
      }
      foundUsers = await User.paginate(filter, {page: 1, limit: 5})
    }
    if(!foundUsers.docs.length) return res.status(response.status).json(response) 
    response.msg = "Here's the users"
    response.data = foundUsers.docs
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