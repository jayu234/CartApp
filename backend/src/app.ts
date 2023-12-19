import express, { Express } from "express";

const app: Express = express();

// Middelwares
import errorMiddleware from "./middlewares/error";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import dotenv from "dotenv";
dotenv.config({path: "src/config/config.env"});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND
}));

// All the Routes
import products from "./routes/productRoutes";
import users from "./routes/userRoutes";
import cart from "./routes/cartRoutes";

app.use("/images", express.static(path.join(__dirname, 'uploads')))

app.use("/api/v1/user", users);
app.use("/api/v1/product", products);
app.use("/api/v1/cart", cart);

app.use(errorMiddleware);

export default app;
