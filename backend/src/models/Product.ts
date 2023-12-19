import { Schema, model } from "mongoose";
import IProduct from "../interfaces/IProduct";

const productSchema = new Schema<IProduct>(
  {
    user:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
