import catchAsyncError from "../middlewares/catchAsyncError";
import User from "../models/User";
import ErrorHandler from "../utils/ErrorHandler";

export const register = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return next(new ErrorHandler(400, "Please provied all credentials"));
  }

  const newUser = await User.create(req.body);

  if (!newUser) {
    return next(new ErrorHandler(500, "Failed to register"));
  }

  res.status(201).json({
    success: true,
    result: newUser,
  });
});
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(400, "Please provied all credentials"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password."));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid email or password."));
  }

  const token = user.getJwtToken();

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    })
    .json({
      sucess: true,
      message: "LoggedIn successfully!",
      result: user
    });
});

export const getProfile = catchAsyncError(async (req, res, next)=>{
  const user = await User.findById(req.user?._id);
  if(!user){
    return next(new ErrorHandler(500, "Failed to get user profile!"));
  }
  res.status(200).json({
    success: true,
    result: user
  })
})

export const logout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token", {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
