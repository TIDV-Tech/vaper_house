import {Schema, model} from "mongoose"

const productSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, enum: ["Vaper", "Acondicionador", "Bateria", "Resistencia", "E-liquid", "Accesorio"]},
  brand: {type: String, required: true},
  color: {type: String, required: true},
  nicotine: {type: String, required: true},
  flavor: {type: String, required: true},
  img: {type: String, required: true},
  reviews: {type: [Schema.Types.ObjectId]},
  rating: {type: Schema.Types.ObjectId},
  avaible: {type: Boolean, default: true},
  promotion: {type: Boolean, default: false},
  quantity: {type: Number, required: true, default: 0},
  price: {type: Number, default: 0},
  promotionPrice: {type: Number, default: 0}
}, {
  timestamps: true,
  versionKey: false
})

export const Product = model("product", productSchema)