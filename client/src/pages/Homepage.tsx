import { useEffect, useState } from "react";
import { Rocket, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import EditModal from "../components/EditModal";

const Homepage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Backend URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/products`);
      const data = await res.json();
      setProducts(data.procuts || []); // ✅ fixed typo
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/v1/products/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log("error while deleting the product");
    }
  };

  // Open modal for editing
  const handleEdit = (product: any) => {
    setEditingProduct(product);
  };

  return (
    <div className="mt-10 px-4">
      <h2 className="text-center text-3xl font-bold flex justify-center items-center gap-2 bg-gradient-to-br from-blue-700 to-sky-800 bg-clip-text text-transparent">
        Current Products
        <Rocket size={25} className="animate-pulse" />
      </h2>

      {products.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">No product Found 😥</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg shadow-md p-4 bg-white/10 backdrop-blur-md flex flex-col"
            >
              <img
                src={p.imageURL}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
              <p className="text-sky-400 font-bold mb-4">₹{p.price}</p>

              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Link
          to={"/create_product"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Product
        </Link>
      </div>

      {editingProduct && (
        <EditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={fetchProducts}
        />
      )}
    </div>
  );
};

export default Homepage;
