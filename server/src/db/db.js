import mongoose from "mongoose";

const connectDb = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("FAILED WHILE CONNECTING TO THE DATABASE");
    process.exit(1);
  }
};

export default connectDb;
