<<<<<<< HEAD

import styles from "./navbar.module.css"
import { Link, NavLink } from "react-router-dom"
import ThemeToggle from "../themeToggle/ThemeToggle"
import { useState,useEffect } from "react"
import Cookies from 'js-cookies'

export const Navbar = (logged) => {
  const [loginStatus,setLoginStatus] = useState(false);
  function handleLoginStatus(){
    const token = Cookies.getItem('token');
    return setLoginStatus(token||logged?true:false)
  }
  useEffect(() => {
    handleLoginStatus();
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.social}>
      <img src="/instagram.png" alt="instagram" width={24} height={24}/>

=======
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
>>>>>>> b2eb0533c700fb2d000db4f1f4a74d6cbe4c1aa8
      </div>
      <Link to="/" className={styles.logo}>
        <div>AI Learner</div>
      </Link>
      <div className={styles.links}>
<<<<<<< HEAD

        <ThemeToggle  />
        
        
        <NavLink to="/register"  className={styles.navLink}>Sign Up</NavLink>
        {
          loginStatus?
          <NavLink to="/logout" className={styles.navLink}>Log Out</NavLink>:
          <NavLink to="/login" className={styles.navLink}>Log in</NavLink>
        }
=======
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
>>>>>>> b2eb0533c700fb2d000db4f1f4a74d6cbe4c1aa8
      </div>
    </div>
  );
};

export default Navbar;
