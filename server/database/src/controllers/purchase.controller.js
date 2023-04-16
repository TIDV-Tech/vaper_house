import { Purchase } from "../models/Purchase.js"
const purchase_controller = {}

purchase_controller.registerPurchase = async (userId, productsId, purchaseData) => {
  try {
    const { paymentMethod, totalPrice } = purchaseData
    const purchaseSaved = await new Purchase(userId, productsId, paymentMethod, totalPrice ).save()
    return {msg: "Purchase registered successfuly", purchaseSaved}
  } catch (error) {
    return {msg: "ERROR", error: error.message}
  }
}

purchase_controller.showPurchases = async () => {
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
        localField: "product",
        foreignField: "_id",
        as: "products_purchase"
      }
    }
  ])

  if(!purchases.length){
    return {msg: "There's no purchases yet!", purchases}
  }
  return {msg: "Here's the purchases!", purchases}
}