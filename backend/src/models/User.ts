import { Model, Schema, model } from "mongoose";
import IUser, { IUserMethods } from "../interfaces/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserMethods>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method("getJwtToken", function getJwtToken() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
});

userSchema.method("comparePassword", async function comparePassword(password: string) {
  return await bcrypt.compare(password, this.password);
})

const User = model<IUser, UserModel>('User', userSchema);

export default User;
