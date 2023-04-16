import { User }   from "../models/User.js"

const user_controller = {}

user_controller.saveUser = async (req, res) => {
  try {
    const data = req.body
    const newUser = new User(data)
    const savedUser = await newUser.save()
    res.json({msg: "User registered successfully", savedUser}) 
    // console.log("works... i guess")
  } catch (error) {
    res.json({ msg: " Something went wrong...", error: error.message }) 
    console.log("XD")
  }
}

user_controller.findUsers = async (req, res) => {
  try {
    const users = await User.find().lean()
    res.json(users)
  } catch (error) {
    res.json(error)
  }
}

user_controller.updateUser = async (req, res) => {
  try {
    const { userId, newData } = req.body
    await User.findByIdAndUpdate(userId, newData)
    res.json({msg: "Updated successfully!"}) 
  } catch (error) {
    res.json(error.message) 
  }
}

user_controller.deleteUser = async (req, res) => {
  try {
    const { userId } = req.data
    await User.findByIdAndDelete(userId)
    res.json({msg: "Deleted successfully!"}) 
  } catch (error) {
    res.json(error.message) 
  }
}

export {user_controller}