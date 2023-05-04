import { Purchase }           from "../models/Purchase.js"
import { Product }            from "../models/Product.js"
import { Cart }               from "../models/Cart.js"

const purchase_controller = {}

purchase_controller.registerPurchase = async (req, res) => {
  try {
    let response = {
      msg: "Purchase registered successfully",
      status: 201,
      data: {}
    }
    let { 
      userId, paymentMethod, totalPrice 
    }                       = req.body
    const cart              = await Cart.findById(userId)
    const data              = {user: userId, products: cart.products, paymentMethod, totalPrice}
    const purchaseSaved     = await new Purchase(data).save()
    cart.products           = []
    cart.amountProducts     = []
    const savedCart         = await cart.save()
    response.data = {purchaseSaved, savedCart}
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

purchase_controller.showPurchases = async (req, res) => {
  try {
    let response = {
      msg: "There's no purchases yet!",
      status: 200,
      data: []
    }
    const purchases = await Purchase.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "users_purchase"
        }
      },
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
          as: "products_purchase"
        }
      }
    ])
    response.msg = "Here's the products"
    response.data = purchases 
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

Purchase.watch().on("change", (event) => {
  if(event.operationType == "insert"){
    event.fullDocument.products.forEach(async (productId, index) => {
      const userId  = event.fullDocument.user 
      const cart    = await Cart.findById(userId)
      const product = await Product.findById(productId)
      await Product.findByIdAndUpdate(productId, {amount: product.amount - cart.amountProducts[index]})
    })
  }
})

export { purchase_controller }