import { Cart } from "../models/Cart.js"
import mongoose from "mongoose"
const cart_controller = {}

cart_controller.getCartContent = async (req, res) => {
  try {
    let response = {
      msg: "There's nothing on the cart yet!",
      status: 200,
      data: []
    }
    const cart = await Cart.aggregate([
      {
        $lookup: {
          from: "products",
          let: {
            productId: "$products"
          },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$productId"] }
              }
            }
          ],
          as: "products_cart"
        }
      }
    ])

    if(!cart.length) return res.status(response.status).json(response)
    
    response.data = cart
    response.msg = "Here's the products you have on the cart!"
    res.status(response.status).json(response)
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      data: error
    }
    res.status(response.status).json(response)
  }
}

cart_controller.addToCart = async (req, res) => {
  try {
    let response = {
      msg: "Added to the cart!",
      status: 201,
      data: {}
    }
    let {userId, productId, amountProduct}  = req.body
    productId                               = new mongoose.Types.ObjectId(productId)
    const cart = await Cart.findById(userId)
    const productFound = cart.products.filter(product => product.toString() == productId.toString())
    if(productFound){
      const index     = cart.products.indexOf(productFound.toString())
      cart.amountProducts[index] += amountProduct  
      const savedCart = await cart.save()
      response.msg    = "Add the product amount successfully!"
      response.data   = savedCart
      return res.status(response.status).json(response)
    }
    cart.products.push(productId)
    cart.amountProducts.push(amountProduct)
    const savedCart = await cart.save()
    response.data = savedCart
    res.status(response.status).json(response)
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      data: error
    }
    res.status(response.status).json(response)
  }
}

cart_controller.removeToCart = async (req, res) => {
  try {
    let response = {
      msg: "Cleared the cart successfully!",
      status: 200,
      data: []
    }
    const { userId, productToRemoveId } = req.body
    const cart                          = await Cart.findById(userId)
    const productId                     = cart.products.filter(id => id.toString() === productToRemoveId.toString())
    const productIndex                  = cart.products.indexOf(productId.toString())
    cart.products.splice(productIndex, 1)
    const savedCart = await cart.save()
    response.data = savedCart
    res.status(response.status).json(response)
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      data: error
    }
    res.status(response.status).json(response)
  }
}

cart_controller.emptyCart = async (req, res) => {
  try {
    let response = {
      msg: "Cleared the cart successfully!",
      status: 200,
      data: []
    }
    const { userId }        = req.body
    let cart                = await Cart.findById(userId)
    cart.products           = []
    cart.amountProducts     = []
    const savedCart = await cart.save()
    response.data = savedCart
    res.status(response.status).json(response)
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      data: error
    }
    res.status(response.status).json(response)
  }
}

export { cart_controller }