import { Document } from "mongoose";

export interface IUserMethods{
  getJwtToken(): string,
  comparePassword(password: string): Promise<Boolean>,
}

export default interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}
