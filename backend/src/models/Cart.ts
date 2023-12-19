import { Schema, model } from "mongoose";
import ICart from "../interfaces/ICart";

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        _id: false
      },
    ],
    default: [],
  },
});

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
