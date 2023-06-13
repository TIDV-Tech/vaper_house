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
    const aggregates = Purchase.aggregate([
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
    
    const options = { page: 1, limit: 5 }

    let purchases = await Purchase.aggregatePaginate(aggregates, options)

    response.msg = "Here's the purchases"

    purchases = purchases.docs.map(purchase => {
      const {_id, user_purchase, products_purchase, paymentMethod, totalPrice, createdAt, updatedAt} = purchase
      return {_id, user_purchase: user_purchase[0]._id, products_purchase: products_purchase.map(product => product._id), paymentMethod, totalPrice, createdAt, updatedAt}
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

purchase_controller.findByFilter = async (req, res) => {
  try {
    let response = {
      msg: "Purchases not found!",
      status: 200,
      data: []
    }
    const {filter}    = req.body
    let foundPurchases = []
    if(filter.length){
      filter.map((elm,key) => {
        let k = Object.keys(elm)
        let m = filter[key][k]
        let c = new RegExp('^'+m+'$')
        filter[key][k] = c
      })
      foundPurchases = await Purchase.find({"$or": filter})
    }else{
      if(typeof Object.values(filter)[0] == "string"){
        let k = Object.keys(filter)
        let m = filter[k]
        let c = new RegExp(m)
        filter[k] = c
        k = k[0]
        foundPurchases = await Purchase.find({[k]: {$regex: c}})
      }
      foundPurchases = await Purchase.find(filter)
    }
    if(!foundPurchases.length) return res.status(response.status).json(response) 
    response.msg = "Here's the purchases"
    response.data = foundPurchases
    res.status(response.status).json(response)
  } catch (error) {
    let response = {
      msg: "Something went wrong...",
      status: 400,
      error: error.message
    }
    res.status(response.status).json(response)
  }
}

export { purchase_controller }