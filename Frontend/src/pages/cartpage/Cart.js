import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Cart.module.css";
import ProductImage from "../../images/Product_Image.png";
import axiosInstance from "../../axios/Axios"; // your configured axios instance

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Replace with actual logged-in user id if needed

  // Fetch cart items from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.post("/cart/list", {
          user_id: userId,
        });

        // Example response: [{ product_id: 5, name: ..., price: ..., quantity: 2, ... }]
        setCartItems(response.data || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, [userId]);

  const handleRemove = async (productId) => {
    try {
      await axiosInstance.post("/cart/remove", {
        user_id: userId,
        product_id: productId,
      });

      setCartItems(cartItems.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>My Cart</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", width: "100%" }}>Your cart is empty.</p>
      ) : (
        <div className={styles.grid}>
          {cartItems.map((product) => {
            const discountedPrice =
              product.price - (product.price * (product.discount || 0)) / 100;

            return (
              <div key={product.product_id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={ProductImage} alt={product.name} />
                  {product.discount && (
                    <span className={styles.discountBadge}>
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h3>{product.name}</h3>
                  <p className={styles.category}>{product.category}</p>

                  <p className={styles.description}>{product.description}</p>

                  <div className={styles.priceSection}>
                    {product.discount && (
                      <span className={styles.oldPrice}>₹{product.price}</span>
                    )}
                    <span className={styles.price}>₹{discountedPrice}</span>
                  </div>

                  <p>Quantity: {product.quantity}</p>

                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(product.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
