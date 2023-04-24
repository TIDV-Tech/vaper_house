import mongoose from "mongoose"
import { Purchase } from "../models/Purchase.js"
const purchase_controller = {}

purchase_controller.registerPurchase = async (req, res) => {
  try {
    let response = {
      msg: "Purchase registered successfully",
      status: 201,
      data: {}
    }
    let { paymentMethod, totalPrice, user, products } = req.body
    user                = new mongoose.Types.ObjectId(user)
    products            = products.map(product => new mongoose.Types.ObjectId(product))
    const data          = {user, products, paymentMethod, totalPrice}
    const purchaseSaved = await new Purchase(data).save()
    response.data = purchaseSaved
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

export { purchase_controller }