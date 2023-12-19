import { Router } from "express";
import {
  addItem,
  getCartDetails,
  removeItem,
  updateItemQuantity,
} from "../controllers/cartController";
import authenticate from "../middlewares/auth";

const router: Router = Router();

router.route("/add").post(authenticate, addItem);
router.route("/remove/:productId").delete(authenticate, removeItem);
router.route("/update").put(authenticate, updateItemQuantity);
router.route("/items").get(authenticate, getCartDetails);

export default router;
