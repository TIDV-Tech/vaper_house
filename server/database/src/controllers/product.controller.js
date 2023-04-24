import { Product }   from "../models/Product.js"

const product_controller = {}

product_controller.saveProduct = async (req, res) => {
  try {
    let response = {
      msg: "Product saved successfully",
      status: 201,
      data: {}
    }
    const data = req.body
    const newProduct = new Product(data)
    const productFound = await Product.findOne({name: newProduct.name}) 
    if(productFound){
      await Product.updateOne({name: newProduct.name}, {$inc: {amount: 1}})
      response = {
        msg: "Product updated successfully",
        status: 200
      }
      return res.status(response.status).json(response)
    }
    const savedProduct = await newProduct.save()
    response.data = savedProduct
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

product_controller.findProducts = async (req, res) => {
  try {
    let response = {
      msg: "There's no products yet!",
      status: 200,
      data: []
    }
    const products = await Product.find().lean()
    if(!products.length){
      return res.status(response.status).json(response)
    }
    response.msg = "Here's the products" 
    response.data = products
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

product_controller.findByFilter = async (req, res) => {
  try {
    let response = {
      msg: "Products not found!",
      status: 200,
      data: []
    }
    const {filter} = req.body
    const products = await Product.find(filter)
    if(!products.length){
      return res.status(response.status).json(response)
    }
    response.msg = "Here's the products" 
    response.data = products
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

product_controller.updateProduct = async (req, res) => {
  try {
    let response = {
      msg: "Product updated successfully!",
      status: 200
    }
    const { productId, newData } = req.body
    await Product.findByIdAndUpdate(productId, newData)
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

product_controller.deleteProduct = async (req, res) => {
  try {
    let response = {
      msg: "Product deleted successfully",
      status: 200
    }
    const { productId }   = req.body
    await Product.findByIdAndDelete(productId)
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

export {product_controller}