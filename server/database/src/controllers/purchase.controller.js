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
    const { userId, paymentMethod } = req.body
    const cart                      = await Cart.findById(userId)
    if(!cart.products.length){
      response = {
        msg: "You need at least one product on the cart to buy something",
        status: 400,
        data: {}
      }
      return res.status(response.status).json(response) 
    }
    let allCarts = await Cart.aggregate([
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
    let products = allCarts.map(cart => {
      if(cart._id.toString() == userId.toString()){
        const { products } = cart
        return { products }
      }
    })
    products        = products[0].products
    for(let i = 0; i < products.length; i++){
      const product = await Product.findById(products[i].toString())
      products[i]   = product
    }
    let prices      = products.map(product => product.price)
    prices          = prices.map((price, index) => price * cart.quantityProducts[index]) 
    let totalPrice  = prices.reduce((acum, price) => acum += price)
    const data      = {
      user: userId, 
      products: cart.products, 
      paymentMethod, 
      totalPrice: parseFloat(totalPrice)
    }
    const purchaseSaved     = await new Purchase(data).save()
    cart.products           = []
    cart.quantityProducts   = []
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
    let purchases = await Purchase.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user_purchase"
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
    response.msg = "Here's the purchases"
    purchases = purchases.map(purchase => {
      const {_id, paymentMethod, createdAt, updatedAt, totalPrice, user_purchase, products_purchase} = purchase
      return {_id, paymentMethod, createdAt, updatedAt, totalPrice, user_purchase, products_purchase}
    })
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

export { purchase_controller }