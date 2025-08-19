import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/products.route.js";

const app = express();
const __dirname = path.resolve();

// Middleware
// Only enable CORS in development
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["POST", "GET", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    })
  );
}

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1/products", router);

// Serve React in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"));
  });
}

export default app;
