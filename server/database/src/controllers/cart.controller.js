import { Cart }     from "../models/Cart.js"
import { Product }  from "../models/Product.js"
import mongoose from "mongoose"
const cart_controller = {}

cart_controller.getCartContent = async (req, res) => {
  try {
    let response = {
      msg: "There's nothing on the cart yet!",
      status: 200,
      data: {}
    }
    const {userId}    = req.body
    const carts        = await Cart.aggregate([
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
    let myCart = carts.find(cart => cart._id == userId)
    const {_id, products_cart, quantityProducts} = myCart

    if(!products_cart.length){
      response = {
        msg: "There's nothing on the cart yet!",
        status: 200,
        data: []
      }
      return res.status(response.status).json(response)
    }
    response.data = {_id, products_cart, quantityProducts}
    response.msg  = "Here's the products you have on the cart!"
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
    let {userId, productId, quantityProducts}  = req.body
    if(!quantityProducts){
      response = {
        msg: "You need a quantity to add to your cart",
        status: 400,
        data: {}
      }
      return res.status(response.status).json(response)
    }
    productId           = new mongoose.Types.ObjectId(productId)
    const cart          = await Cart.findById(userId)
    const productOnCart = cart.products.find(product => product.toString() == productId.toString())
    if(productOnCart){
      const index         = cart.products.indexOf(productOnCart.toString())
      cart.quantityProducts[index] += quantityProducts
      const productFound = await Product.findById(productId.toString())
      await Product.findByIdAndUpdate(productId, {quantity: productFound.quantity - quantityProducts})
      if(productFound.quantity == 0){
        await Product.findByIdAndUpdate(productId, {avaible: false})
      }
      const savedCart   = await cart.save()
      response = {
        msg: "updated the product quantity successfully!",
        status: 200,
        data: savedCart
      }
      return res.status(response.status).json(response)
    }
    const productFound = await Product.findById(productId.toString())
    if(!productFound){
      response = {
        msg: "The product you try to add on the cart is not found!",
        status: 400,
        data: {}
      }
      return res.status(response.status).json(response)
    }
    cart.products.push(productId)
    cart.quantityProducts.push(quantityProducts)
    const index = cart.quantityProducts.length - 1
    await Product.findByIdAndUpdate(productId, {quantity: productFound.quantity - cart.quantityProducts[index]})
    if(productFound.quantity == 0){
      await Product.findByIdAndUpdate(productId, {avaible: false})
    }
    const savedCart = await cart.save()
    response.data   = savedCart
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
    const productId                     = cart.products.find(id => id.toString() === productToRemoveId)
    if(!productId){
      response = {
        msg: "The product's not found on the cart!",
        status: 400,
        data: {}
      }
      return res.status(response.status).json(response) 
    }
    const productIndex  = cart.products.indexOf(productId.toString())
    const productFound  = await Product.findById(productId)
    await Product.findByIdAndUpdate(productId, {quantity: productFound.quantity + cart.quantityProducts[productIndex]})
    cart.products.splice(productIndex, 1)
    cart.quantityProducts.splice(productIndex, 1)
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
    cart.quantityProducts   = []
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