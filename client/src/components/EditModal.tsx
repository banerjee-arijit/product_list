import { Modal, Input } from "antd";
import { useState } from "react";

interface EditModalProps {
  product: any;
  onClose: () => void;
  onUpdated: () => void;
}

const EditModal = ({ product, onClose, onUpdated }: EditModalProps) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    imageURL: product.imageURL,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:4000/api/v1/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onUpdated(); // refresh product list
      onClose(); // close modal
    } catch (err) {
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Product"
      open={true}
      onOk={handleSave}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Save"
      cancelText="Cancel"
    >
      <div className="flex flex-col gap-3">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <Input
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
        />
      </div>
    </Modal>
  );
};

export default EditModal;
