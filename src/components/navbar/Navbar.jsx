import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Cookies from "js-cookie";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // Re-run effect when location changes

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token");
  };

  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <img src="/bird.png" alt="logo" width={50} height={50}  className={styles.icon}/>
      </div>
      <Link to="/" className={styles.logo}>
        <div>AI Learner</div>
      </Link>
      <div className={styles.links}>
      {/* <button onClick={handleLogout} className={styles.navLink}> */}
      <NavLink to="/about" className={styles.navLink}>
            AboutUS
            </NavLink>
          {/* </button> */}
        <ThemeToggle />
        {isLoggedIn ? (
          <button onClick={handleLogout} className={styles.navLink}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/register" className={styles.navLink}>
              Sign Up
            </NavLink>
            <NavLink to="/login" className={styles.navLink}>
              Log in
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
