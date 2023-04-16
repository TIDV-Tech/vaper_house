import { Product }   from "../models/Product.js"

const product_controller = {}

product_controller.saveProduct = async (req, res) => {
  try {
    const data = req.body
    const newProduct = new Product(data)
    const productFound = await Product.findOne({name: newProduct.name}) 
    if(productFound){
      await Product.updateOne({name: newProduct.name}, {$inc: {amount: 1}})
      return res.json({ msg: "Product updated successfully" })
    }else{
      const savedProduct = await newProduct.save()
      return res.json({ msg: "Product saved successfully", savedProduct })
    }
  } catch (error) {
    res.json({ msg: "Something went wrong...", error: error.message })
  }
}

product_controller.findProducts = async (req, res) => {
  try {
    const products = await Product.find().lean()
    res.json(products)
  } catch (error) {
    res.json(error)
  }
}

product_controller.findProductsByName = async (req, res) => {
  try {
    let { search }      = req.body
    search              = search.toLowerCase()
    const products      = await Product.find()
    const productFound  = products.filter(product => {
      const lowerName = product.name.toLowerCase()
      console.log(lowerName)
      const found     = lowerName.includes(search)
      console.log(found)
      return found
    })
    res.json(productFound)
  } catch (error) {
    res.json({msg: "something went wrong...", error})
  }
}

product_controller.updateProduct = async (req, res) => {
  try {
    const { productId, newData } = req.body
    const response = await Product.findByIdAndUpdate(productId, newData)
    res.json({msg: "Updated successfully!"})
  } catch (error) {
    res.json(error.message)
  }
}

product_controller.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const response      = await Product.findByIdAndDelete(productId)
    res.json({msg: "Deleted successfully!"})
  } catch (error) {
    res.json(error.message)
  }
}

export {product_controller}