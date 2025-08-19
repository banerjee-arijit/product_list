import { products } from "../models/products.model.js";

const findAllProducts = async (req, res) => {
  try {
    const allProducts = await products.find();
    if (!allProducts) {
      return res
        .status(404)
        .json({ success: false, message: "there is no products" });
    }
    res.status(200).json({
      success: true,
      procuts: allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

const createNewproduct = async (req, res) => {
  try {
    const { name, price, imageURL } = req.body;
    if (!name || !price || !imageURL) {
      return res
        .status(404)
        .json({ success: false, message: "Please provide all fields" });
    }
    const newProducts = await products.create({ name, price, imageURL });
    return res.status(200).send({ success: true, data: newProducts });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const updateproduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, price, imageURL } = req.body;
    const updatedProduct = await products.findByIdAndUpdate(
      id,
      { name, price, imageURL },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteproduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await products.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not Found" });
    }
    return res
      .status(200)
      .json({ success: true, deletedProduct: deletedProduct });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export { createNewproduct, deleteproduct, findAllProducts, updateproduct };
