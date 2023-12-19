import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: "config.env"});

export const connectToMongo = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URI as string)
    .then((data) => {
      console.log(
        `Connected to  mongo successfully at host: ${data.connection.host}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
