import catchAsyncError from "../middlewares/catchAsyncError";
import Cart from "../models/Cart";
import ErrorHandler from "../utils/ErrorHandler";

export const addItem = catchAsyncError(async (req, res, next) => {
  const { p_id } = req.body;

  if (!p_id) {
    return next(new ErrorHandler(400, "Please provide product details!"));
  }

  const existingCart = await Cart.findOne({ user: req.user?._id });

  if (existingCart) {
    existingCart.items.push({ product: p_id, quantity: 1 });

    const updatedCart = await existingCart.save();

    if (!updatedCart) {
      return next(new ErrorHandler(500, "Falied to add item to the cart!"));
    }

    res.status(200).json({
      success: true,
      message: "Item added successfully!",
      result: existingCart,
    });
  } else {
    const newCart = await Cart.create({
      user: req.user,
      items: [{ product: p_id, quantity: 1 }],
    });
    if (!newCart) {
      return next(new ErrorHandler(500, "Failed to add item to the cart!"));
    }
    res.status(201).json({
      success: true,
      result: newCart,
    });
  }
});

export const updateItemQuantity = catchAsyncError(async (req, res, next) => {
  const { query, productId } = req.body;

  if (!query || !productId) {
    return next(
      new ErrorHandler(400, "Please provide query type and product!")
    );
  }

  let update;
  if (query === "add") {
    update = { $inc: { "items.$.quantity": 1 } };
  } else if (query === "remove") {
    update = { $inc: { "items.$.quantity": -1 } };
  } else {
    return next(new ErrorHandler(400, "Invalid query type!"));
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { user: req.user?._id, "items.product": productId },
    update,
    { new: true }
  ).populate("items.product");

  if (!updatedCart) {
    return next(new ErrorHandler(404, "Cart or Product not found!"));
  }

  res.status(200).json({
    success: true,
    message: "Cart updated successfully!",
    result: updatedCart,
  });
});

export const removeItem = catchAsyncError(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) {
    return next(new ErrorHandler(400, "Please provide product!"));
  }
  const updatedCart = await Cart.findOneAndUpdate(
    { user: req.user?._id, "items.product": productId },
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate("items.product");
  if (!updatedCart) {
    return next(new ErrorHandler(500, "Cart or Product not found!"));
  }

  res.status(200).json({
    success: true,
    message: "Item removed successfully!",
    result: updatedCart,
  });
});

export const getCartDetails = catchAsyncError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user?._id }).populate("items.product");
  if (!cart) {
    return next(new ErrorHandler(404, "Cart not found!"));
  }

  res.status(200).json({
    success: true,
    result: cart,
  });
});
