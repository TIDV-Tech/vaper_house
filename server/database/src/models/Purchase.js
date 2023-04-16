import {Schema, model} from "mongoose"

const purchaseSchema = new Schema({
  user: {type: Schema.Types.ObjectId, required: true},
  products: {type: [Schema.Types.ObjectId], required: true},
  paymentMethod: {type: String, enum: ["Tarjeta", "VISA", "PayPal", "Binance", "Bancolombia"], required: true},
  totalPrice: {type: Number, required: true}
}, {
  timestamps: true,
  versionKey: false
})

const Purchase = model("purchase", purchaseSchema)

export { Purchase }