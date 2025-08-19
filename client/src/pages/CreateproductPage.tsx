import { useState } from "react";
import { Link } from "react-router-dom";

const CreateProductPage = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    imageURL: "",
  });

  // Backend URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/v1/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDetails),
      });

      const data = await res.json();
      console.log("Created:", data);
      setProductDetails({ name: "", price: "", imageURL: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-sky-900/10 rounded-xl shadow-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-sky-700">
          Create New Product
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-500 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-500 outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="imageURL" className="block font-medium mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={productDetails.imageURL}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-800 transition duration-200"
        >
          Create Product
        </button>
      </form>
      <Link className="mt-10" to={"/"}>
        Go to HomePage
      </Link>
    </div>
  );
};

export default CreateProductPage;
