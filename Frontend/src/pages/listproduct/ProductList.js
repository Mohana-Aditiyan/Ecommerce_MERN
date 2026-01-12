import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./ProductList.module.css";
import Button from "../../components/elements/Button";
import ProductImage from "../../images/Product_Image.png";
import axiosInstance from "../../axios/Axios";


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.post("/api/products/list", {
          category: "", // fetch all initially
          search: "",
        });

        setProducts(response.data || []);
        setFilteredProducts(response.data || []);

        // Set categories dynamically
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

  // Filter products on category or search change
  useEffect(() => {
    const filtered = products.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Our Products</h1>

      {/* 🔹 Category Filter */}
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

      {/* 🔹 Search Bar */}
      <div className={styles.searchBarWrapper}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* 🔹 Product Grid */}
      <div className={styles.grid}>
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>No products found.</p>
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

                  <p className={styles.description}>
                    {product.description}
                  </p>

                  <div className={styles.priceSection}>
                    <span className={styles.oldPrice}>₹{product.price}</span>
                    <span className={styles.price}>₹{discountedPrice}</span>
                  </div>

                  <Button>Add to Cart</Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
