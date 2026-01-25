import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import this
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";
import styles from "../login/Login.module.css";
import axiosInstance from "../../axios/Axios";
import Modal from "../../components/resuablemodal/Modal";

export default function Auth() {
  const [active, setActive] = useState(false);

  const navigate = useNavigate(); // <-- hook for navigation

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Notice");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", loginData);
      console.log("Login Success:", res.data);

      // Show modal
      setModalTitle("Success");
      setModalMessage("Login Successful!");
      setModalOpen(true);

      // Navigate to /products after short delay
      setTimeout(() => {
        setModalOpen(false);
        navigate("/products"); // <-- navigate to products page
      }, 1500); // 1.5 seconds delay to show modal
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);

      // Show error modal
      setModalTitle("Error");
      setModalMessage("Invalid Credentials!");
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.container} ${active ? styles.rightPanelActive : ""}`}>
        {/* Sign Up */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form>
            <h1>Sign Up</h1>
            <span>or use your email for registration</span>

            <Input placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />

            <Button
              type="button"
              onClick={() => {
                setModalTitle("Notice");
                setModalMessage(
                  "This feature is currently under development. Updates will be available soon. Please sign in using the email ID provided in the description."
                );
                setModalOpen(true);
              }}
            >
              Sign Up
            </Button>
          </form>
        </div>

        {/* Sign In */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <span>or use your account</span>

            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModalTitle("Notice");
                setModalMessage(
                  "This feature is currently under development. Updates will be available soon. Please sign in using the email ID provided in the description."
                );
                setModalOpen(true);
              }}
            >
              Forgot your password?
            </a>

            <Button type="submit">Sign In</Button>
          </form>
        </div>

        {/* Overlay */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info</p>
              <Button ghost onClick={() => setActive(false)}>
                Sign In
              </Button>
            </div>

            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <Button ghost onClick={() => setActive(true)}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
