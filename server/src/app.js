import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/products.route.js";

const app = express();
const __dirname = path.resolve();

// Middleware
// Only enable CORS in development
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1/products", router);

export default app;
