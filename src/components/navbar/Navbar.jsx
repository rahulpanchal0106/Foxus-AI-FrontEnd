import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Cookies from "js-cookie";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./navbar.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const Menus = ['AboutUs', 'Logout'];
  const navigate = useNavigate();
  const {theme} = useContext(ThemeContext);
  console.log("THEMEEEEEEEEEEEEEEEE: ",theme)
  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // Re-run effect when location changes

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token");
    setOpen(false);
    navigate("/");
  };

  const handleMenuClick = (menu) => {
    if (menu === "Logout") {
      handleLogout();
    } else if (menu === "AboutUs") {
      navigate("/about");
      setOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <img src="/bird.png" alt="logo"  width={50} height={50} className={styles.icon} style={{
          filter: theme=='dark'?'invert(1)':'invert(0)'
                   }} />
      </div>
      <Link to="/" className={styles.logo}>
        <div style={{
          color:'var(--color)'
        }} >AI Learner</div>
      </Link>
      <div className={styles.links}>
        <ThemeToggle className="" />
        {isLoggedIn ? null : (
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
      {isLoggedIn && (
        <div className="pt-2">
          <div className="relative">
            <div onClick={() => setOpen(!open)} className="cursor-pointer object-cover rounded-full mb-4">
              <AccountCircleIcon fontSize="large" />
            </div>
            {open && (
              <div className="relative">
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                  <div className="absolute top-0 right-2 transform -translate-y-full">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white dark:border-b-gray-800"></div>
                  </div>
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {Menus.map((menu) => (
                      <div
                        key={menu}
                        onClick={() => handleMenuClick(menu)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        role="menuitem"
                      >
                        {menu}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
