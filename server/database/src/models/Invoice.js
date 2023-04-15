import {Schema, model} from "mongoose"

const invoiceSchema = new Schema({
  userInfo: Schema.Types.ObjectId
}, {
  timestamps: true
})