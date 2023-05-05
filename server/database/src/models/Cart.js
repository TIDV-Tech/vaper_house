import { Schema, model } from "mongoose"

const CartSchema = new Schema({
  products: {type: [Schema.Types.ObjectId], default: []},
  quantityProducts: {type: [Number], default: []},
}, {
  versionKey: false
})

export const Cart = model("cart", CartSchema)