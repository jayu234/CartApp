import app from "./app";

import dotenv from "dotenv";
dotenv.config({ path: "src/config/config.env" });

import { connectToMongo } from "./config/db";
connectToMongo();


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at ${process.env.HOST}:${process.env.PORT}`);
});
