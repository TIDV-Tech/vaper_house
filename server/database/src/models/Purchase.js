import {Schema, model}    from "mongoose"
import aggregatePaginate  from "mongoose-aggregate-paginate-v2"

const purchaseSchema = new Schema({
  user: {type: Schema.Types.ObjectId, required: true},
  products: {type: [Schema.Types.ObjectId], required: true},
  paymentMethod: {type: String, enum: ["Tarjeta", "VISA", "PayPal", "Binance", "Bancolombia"], required: true},
  totalPrice: {type: Number, required: true}
}, {
  timestamps: true,
  versionKey: false
})

purchaseSchema.plugin(aggregatePaginate)

export const Purchase = model("purchase", purchaseSchema)