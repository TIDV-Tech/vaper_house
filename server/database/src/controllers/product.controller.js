import { Product }   from "../models/Product.js"

const product_controller = {}

product_controller.saveProduct = async (data) => {
  try {
    const newProduct = new Product(data)
    const savedProduct = await newProduct.save()
    return {
      msg: "Product saved successfully",
      savedProduct
    }
  } catch (error) {
    return {
      msg: "Something went wrong...",
      error: error.message
    }
  }
}

product_controller.findProducts = async () => {
  try {
    const products = await Product.find().lean()
    return products
  } catch (error) {
   return error
  }
}

product_controller.updateProduct = async (userId, newData) => {
  try {
    const response = await Product.findByIdAndUpdate(userId, newData)
    return response
  } catch (error) {
    return error.message
  }
}

product_controller.deleteProduct = async (userId) => {
  try {
    const response = Product.findByIdAndDelete(userId)
    return response
  } catch (error) {
    return error.message
  }
}

export {product_controller}