import { Product }    from "../models/Product.js"
import { Purchase }   from "../models/Purchase.js"

const product_controller = {}

product_controller.saveProduct = async (req, res) => {
  try {
    let response = {
      msg: "Product saved successfully",
      status: 201,
      data: {}
    }
    const data          = req.body
    const newProduct    = new Product(data)
    const productFound  = await Product.findOne({name: newProduct.name}) 
    if(productFound){
      await Product.updateOne({name: newProduct.name}, {$inc: {quantity: 1}})
      response = {
        msg: "Product updated successfully",
        status: 200
      }
      return res.status(response.status).json(response)
    }
    const savedProduct  = await newProduct.save()
    response.data       = savedProduct
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

product_controller.changeProductPromotion = async (req, res) => {
  try {
    let response = {
      msg: "The product's on promotion now",
      status: 200,
    }
    const { productId, promotionPrice }   = req.body
    const product                         = await Product.findById(productId)
    if(!product.promotion){
      if(!promotionPrice){
        response = {
          msg: "The promotion price's required to promote this product",
          status: 400
        }
        return res.status(response.status).json(response)
      }
      product.promotion       = true 
      product.promotionPrice  = promotionPrice
      await product.save()
      return res.status(response.status).json(response)
    }else{
      product.promotion       = false
      product.promotionPrice  = 0
      await product.save()
      response.msg            = "The product isn't on promotion now"
      return res.status(response.status).json(response)
    }
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
    response.msg  = "Here's the products" 
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
    filter.map((elm,key) => {
      let k = Object.keys(elm)
      let m = filter[key][k]
      let c = new RegExp(m)
      filter[key][k] = c
    })
    const products = await Product.find({"$or": filter})
    if(!products.length){ return res.status(response.status).json(response) }
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

product_controller.findByMostRecent = async (req, res) => {
  try {
    let response = {
      msg: "Here's the most recent products!",
      data: [],
      status: 200
    }
    const today           = new Date()
    let lastFifteenDays   = today.setDate(today.getDate() - 15)
    lastFifteenDays       = new Date(lastFifteenDays)
    const products        = await Product.find({createdAt: {"$gte": new Date(lastFifteenDays), "$lte": new Date()}})
    response.data         = products
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

product_controller.findByRelated = async (req, res) => {
  try {
    let response = {
      msg: "Here's the related products",
      status: 200,
      data: []
    }
    const { productId }   = req.body
    const product         = await Product.findById(productId)
    let productsByTypes   = await Product.find({type: product.type}) 
    let productsByBrands  = await Product.find({brand: product.brand})
    response.data = {
      randomTypes: [
        productsByTypes[Math.trunc(Math.random() * productsByTypes.length)], 
        productsByTypes[Math.trunc(Math.random() * productsByTypes.length)]
      ],
      randomBrands: [
        productsByBrands[Math.trunc(Math.random() * productsByBrands.length)], 
        productsByBrands[Math.trunc(Math.random() * productsByBrands.length)]
      ]
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