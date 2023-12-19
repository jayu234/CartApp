import { Router } from "express";
import { createProduct, getAllProducts, getProductDetails } from "../controllers/productController";
import upload from "../utils/uploadImage";
import authenticate from "../middlewares/auth";

const router:Router = Router();

router.route("/create").post(authenticate, upload.single("image"), createProduct);
router.route("/all").get(authenticate, getAllProducts);
router.route("/:id").get(authenticate, getProductDetails);

export default router;
