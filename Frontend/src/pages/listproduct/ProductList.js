import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./ProductList.module.css";
import Button from "../../components/elements/Button";
import ProductImage from "../../images/Product_Image.png";
import axiosInstance from "../../axios/Axios";
import Modal from "../../components/resuablemodal/Modal";

export default function ProductList() {
const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const [categories, setCategories] = useState(["All"]);
const [selectedCategory, setSelectedCategory] = useState("All");
const [searchTerm, setSearchTerm] = useState("");
const [modalMessage, setModalMessage] = useState("");
const [modalTitle, setModalTitle] = useState("Notice");
const [modalOpen, setModalOpen] = useState(false); // ✅ FIX

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.post("products/list", {
          category: "",
          search: "",
        });

        setProducts(response.data || []);
        setFilteredProducts(response.data || []);

        const dynamicCategories = [
          "All",
          ...new Set(response.data.map((p) => p.category)),
        ];
        setCategories(dynamicCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

useEffect(() => {
  const fetchFilteredProducts = async () => {
    try {
      const payload = {
        category: selectedCategory === "All" ? "" : selectedCategory,
        search: searchTerm,
      };

      const res = await axiosInstance.post("products/list", payload);

      setFilteredProducts(res.data || []);
    } catch (error) {
      console.error("Filter API error:", error);
    }
  };

  fetchFilteredProducts();
}, [selectedCategory, searchTerm]);


  // 🔥 Add to Cart API (STATIC PAYLOAD)
  const handleAddToCart = async () => {
    try {
      const payload = {
        user_id: 1,
        product_id: 5,
        quantity: 2,
      };

      const res = await axiosInstance.post("/cart/add", payload);
      console.log("Add to Cart:", res.data);
      setModalTitle("Success");
      setModalMessage("Thanks for shopping with us! 🛍️ Your product has been added to the cart. This feature is currently under development and will be fully functional soon.");
      setModalOpen(true);
    } catch (error) {
      console.error("Add to cart error:", error);
      setModalTitle("Error");
      setModalMessage("Failed to add product!");
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Our Products</h1>

      {/* Category Filter */}
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

      {/* Product Grid */}
      <div className={styles.grid}>
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => {
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

                  {/* 🔥 Add to Cart */}
                  <Button onClick={handleAddToCart}>Add to Cart</Button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Modal */}
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
