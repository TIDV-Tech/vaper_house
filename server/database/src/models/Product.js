import {Schema, model} from "mongoose"

const productSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  brand: {type: String},
  avaible: {type: Boolean, default: true},
  amount: {type: Number, required: true},
  price: {type: Number, default: 0}
}, {
  timestamps: true,
  versionKey: false
})

const Product = model("product", productSchema)

export { Product }