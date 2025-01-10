import mongoose from "mongoose";

export const connectDB = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Some database error", error));
