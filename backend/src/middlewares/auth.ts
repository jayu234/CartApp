import { NextFunction, Request, Response } from "../types/express";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import User from "../models/User";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler(403, "Please login to access the resources"));
  }

  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET as Secret
  ) as JwtPayload;

  const user = await User.findById(decodedData.id);
  
  if (!user) {
    return next(new ErrorHandler(404, "User not found!"));
  }

  req.user = user;

  next();
};
export default authenticate;
