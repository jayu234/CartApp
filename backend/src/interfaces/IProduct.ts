import { Document, Schema } from "mongoose";

export default interface IProduct extends Document{
    user: Schema.Types.ObjectId,
    name: string,
    description: string,
    quantity: number,
    unit_price: number,
    image: string
}