import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";
import styles from "../login/Login.module.css";

export default function Auth() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <div
        className={`${styles.container} ${
          active ? styles.rightPanelActive : ""
        }`}
      >
        {/* Sign Up */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form>
            <h1>Sign Up</h1>

            {/* <div className={styles.socialContainer}>
            <SocialIcon icon="fab fa-instagram" />
            <SocialIcon icon="fab fa-google" />
            <SocialIcon icon="fab fa-tiktok" />
          </div> */}

            <span>or use your email for registration</span>

            <Input placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />

            <Button>Sign Up</Button>
          </form>
        </div>

        {/* Sign In */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form>
            <h1>Sign In</h1>

            {/* <div className={styles.socialContainer}>
            <SocialIcon icon="fab fa-instagram" />
            <SocialIcon icon="fab fa-google" />
            <SocialIcon icon="fab fa-tiktok" />
          </div> */}

            <span>or use your account</span>

            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />

            <a href="#">Forgot your password?</a>

            <Button>Sign In</Button>
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
    </div>
  );
}
