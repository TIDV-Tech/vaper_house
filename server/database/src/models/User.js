import {Schema, model} from "mongoose"

const userSchema = new Schema({
  fullName: { type: String, required: true },
  dateBirth: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

const User = model("user", userSchema)

export { User }