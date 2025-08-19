import express from "express";
import {
  createNewproduct,
  deleteproduct,
  findAllProducts,
  updateproduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/", findAllProducts);
router.post("/", createNewproduct);
router.put("/:id", updateproduct);
router.delete("/:id", deleteproduct);

export default router;
