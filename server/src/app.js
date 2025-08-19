import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/products.route.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://product-list-frontend-vndv.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
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
