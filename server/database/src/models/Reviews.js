import {Schema, model} from "mongoose"

const reviewSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  description: {type: String, required: true},
  rating: {type: Number, enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], required: true},
}, {
  timestamps: true,
  versionKey: false
})

export const Review = model("reviews", reviewSchema)