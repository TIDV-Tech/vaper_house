import mongoose from "mongoose"
import { Purchase } from "../models/Purchase.js"
const purchase_controller = {}

purchase_controller.registerPurchase = async (req, res) => {
  try {
    const { paymentMethod, totalPrice }   = req.body
    let   { user, products }              = req.body
    user        = new mongoose.Types.ObjectId(user)
    products    = products.map(product => new mongoose.Types.ObjectId(product))
    const data  = {user, products, paymentMethod, totalPrice}
    const purchaseSaved = await new Purchase(data).save()
    res.json({msg: "Purchase registered successfuly", purchaseSaved}) 
  } catch (error) {
    res.json({msg: "ERROR", error: error.message}) 
  }
}

purchase_controller.showPurchases = async (req, res) => {
  const resultado1 = await Purchase.aggregate([
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

  
  // if(!purchases.length){
    //   res.json({msg: "There's no purchases yet!", purchases}) 
  // }
  // res.json({msg: "Here's the purchases!", purchases}) 

  res.json({resultado1})
}
export { purchase_controller }