import { User }   from "../models/User.js"

const user_controller = {}

user_controller.saveUser = async (data) => {
  try {
    const newUser = new User(data)
    const savedUser = await newUser.save()
    return {
      msg: "User saved successfully",
      savedUser
    }
  } catch (error) {
    return {
      msg: "Something went wrong...",
      error: error.message
    }
  }
}

user_controller.findUsers = async () => {
  try {
    const users = await User.find().lean()
    return users
  } catch (error) {
   return error
  }
}

user_controller.updateUser = async (userId, newData) => {
  try {
    const response = await User.findByIdAndUpdate(userId, newData)
    return response
  } catch (error) {
    return error.message
  }
}

user_controller.deleteUser = async (userId) => {
  try {
    const response = User.findByIdAndDelete(userId)
    return response
  } catch (error) {
    return error.message
  }
}

export {user_controller}