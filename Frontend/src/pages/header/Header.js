import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <i className="fas fa-shopping-bag"></i>
        <span>ShopEase</span>
      </div>

      <nav className={styles.nav}>
        <Link to="/products" className={styles.navItem}>
          <i className="fas fa-box"></i>
          <span>Products</span>
        </Link>

        <Link to="/create" className={styles.navItem}>
          <i className="fas fa-plus-circle"></i>
          <span>Create Product</span>
        </Link>

        <Link to="/cart" className={styles.navItem}>
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
          <span className={styles.cartBadge}>3</span>
        </Link>

        <button
          className={`${styles.navItem} ${styles.logout}`}
          onClick={() => navigate("/")}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Sign Out</span>
        </button>
      </nav>
    </header>
  );
}
