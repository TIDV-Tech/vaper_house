import {Schema, model}  from "mongoose"
import paginate         from "mongoose-paginate-v2"

const userSchema = new Schema({
  fullName: { type: String, required: true },
  dateBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.plugin(paginate)

export const User = model("user", userSchema)