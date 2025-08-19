import mongoose, { Schema, model } from "mongoose";

const productsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a valid product name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please enter  a valid price above that $10"],
    },
    imageURL: {
      type: String,
      required: [true, "please enter a valid image url"],
    },
  },
  { timestamps: true }
);

export const products = model("products", productsSchema);
