import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import Product from "../models/Product";

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, quantity, unit_price } = req.body;

  if (!name || !description || !quantity || !unit_price) {
    return next(new ErrorHandler(400, "Provide all the required fields"));
  }

  const uploadedImage = req.file;

  if (!uploadedImage) {
    return next(new ErrorHandler(400, "Image is required"));
  }

  const savedFilename = uploadedImage.filename;

  const product = await Product.create({
    user: req.user,
    name: name,
    description: description,
    quantity: quantity,
    unit_price: unit_price,
    image: savedFilename,
  });

  if (!product) {
    return next(new ErrorHandler(500, "Failed to create product!"));
  }

  res.status(201).json({
    success: true,
    result: product,
  });
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const userId = req.user?._id;
  const products = await Product.find({ user: userId });

  if (!products) {
    return next(new ErrorHandler(500, "Failed to get products!"));
  }

  res.status(200).json({
    success: true,
    result: products,
  });
});

export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler(400, "Please provide product id!"));
  }

  const productDetail = await Product.findById(id);

  if (!productDetail) {
    return next(new ErrorHandler(500, "Failed to get product details!"));
  }

  res.status(200).json({
    success: true,
    result: productDetail,
  });
});
