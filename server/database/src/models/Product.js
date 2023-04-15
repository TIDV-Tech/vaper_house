import {Schema, model} from "mongoose"

const productSchema = new Schema({
  name: {type: String, require: true},
  description: {type: String, require: true},
  category: {type: String},
  avaible: {type: Boolean, default: true},
  amount: {type: Number, require: true},
  price: {type: Number, default: 0}
}, {
  timestamps: true,
  versionKey: false
})

const Product = model("product", productSchema)

export { Product }