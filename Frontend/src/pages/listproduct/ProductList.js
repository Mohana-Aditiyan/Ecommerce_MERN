import { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./ProductList.module.css";
import Button from "../../components/elements/Button";
import ProductImage from "../../images/Product_Image.png";
import axiosInstance from "../../axios/Axios";
import Modal from "../../components/resuablemodal/Modal";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Notice");
  const [modalOpen, setModalOpen] = useState(false);

  const isFirstRender = useRef(true); // prevent double call

  // ================= FETCH API =================
  const fetchProducts = useCallback(async () => {
    try {
      const payload = {
        category: selectedCategory === "All" ? "" : selectedCategory,
        search: searchTerm,
      };

      const res = await axiosInstance.post("products/list", payload);
      setProducts(res.data || []);

      // categories only once
      if (isFirstRender.current) {
        const dynamicCategories = [
          "All",
          ...new Set(res.data.map((p) => p.category)),
        ];
        setCategories(dynamicCategories);
        isFirstRender.current = false;
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  }, [selectedCategory, searchTerm]); // fetchProducts now depends on selectedCategory & searchTerm

  // ================= EFFECT =================
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(); // single call only
    }, 500); // debounce search

    return () => clearTimeout(timer);
  }, [fetchProducts]); // ✅ useCallback makes this safe

  // ================= ADD TO CART =================
  const handleAddToCart = async (productId) => {
    try {
      const payload = {
        user_id: 1,
        product_id: productId,
        quantity: 2,
      };

      const res = await axiosInstance.post("/cart/add", payload);
      console.log(res.data);

      setModalTitle("Success");
      setModalMessage("Thanks for shopping with us! 🛍️ Product added to cart.");
      setModalOpen(true);
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to add product!");
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Our Products</h1>

      {/* Category */}
      <div className={styles.filterBar}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.filterBtn} ${
              selectedCategory === category ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className={styles.searchBarWrapper}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Products */}
      <div className={styles.grid}>
        {products.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>No products found.</p>
        ) : (
          products.map((product) => {
            const discountedPrice =
              product.price - (product.price * product.discount) / 100;

            return (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={ProductImage} alt={product.name} />
                  <span className={styles.discountBadge}>
                    {product.discount}% OFF
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <h3>{product.name}</h3>
                  <p className={styles.category}>{product.category}</p>

                  <p className={styles.description}>{product.description}</p>

                  <div className={styles.priceSection}>
                    <span className={styles.oldPrice}>₹{product.price}</span>
                    <span className={styles.price}>₹{discountedPrice}</span>
                  </div>

                  <Button onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
