import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/db.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ FAILED WHILE STARTING THE SERVER", error);
  }
};

startServer();
