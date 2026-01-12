import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";
import styles from "./CreateProduct.module.css";

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", product);
    // Call API to create product here
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
    </div>
  );
}
