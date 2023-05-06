import {Schema, model} from "mongoose"

const userSchema = new Schema({
  fullName: { type: String, required: true },
  dateBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

export const User = model("user", userSchema)