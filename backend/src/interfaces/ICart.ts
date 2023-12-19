import { Document, Schema } from "mongoose";

interface CartItems{
    product: Schema.Types.ObjectId,
    quantity: number,
}

export default interface ICart extends Document{
    user: Schema.Types.ObjectId,
    items: CartItems[],
}