import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";
import styles from "./CreateProduct.module.css";
import axiosInstance from "../../axios/Axios";
import Modal from "../../components/resuablemodal/Modal";

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    description: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: product.name,
        price: Number(product.price),
        discount: Number(product.discount),
        category: product.category,
        stock: Number(product.stock),
        description: product.description,
      };

      const res = await axiosInstance.post(
        "/products/create",
        payload
      );

      console.log("Product Created:", res.data);

      // ✅ Success modal
      setModalTitle("Success");
      setModalMessage("🎉 Product created successfully!");
      setModalOpen(true);

      // Reset form
      setProduct({
        name: "",
        price: "",
        discount: "",
        category: "",
        stock: "",
        description: "",
      });

    } catch (error) {
      console.error("Create product error:", error);

      // ❌ Error modal
      setModalTitle("Error");
      setModalMessage("Failed to create product!");
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Create New Product</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <Input
            name="discount"
            type="number"
            placeholder="Discount (%)"
            value={product.discount}
            onChange={handleChange}
          />

          <Input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
          />

          <Input
            name="stock"
            type="number"
            placeholder="Stock Quantity"
            value={product.stock}
            onChange={handleChange}
            required
          />

          <Input
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <Button type="submit">Add Product</Button>
        </form>
      </div>

      {/* 🔔 Modal */}
      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
