import {Schema, model} from "mongoose"

const categorySchema = new Schema({
  title: {type: String, required: true},
  link: {type: String, required: true},
  img: {type: String, required: true}
},{
  timestamps: true,
  versionKey: false
})

export const Category = model("categories", categorySchema)