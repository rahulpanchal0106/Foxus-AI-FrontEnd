
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

      </div>
      <Link to="/" className={styles.logo}>
      <div >AI Learner</div>
      </Link>
      <div className={styles.links}>

        <ThemeToggle  />
        
        
        <NavLink to="/register"  className={styles.navLink}>Sign Up</NavLink>
        {
          loginStatus?
          <NavLink to="/logout" className={styles.navLink}>Log Out</NavLink>:
          <NavLink to="/login" className={styles.navLink}>Log in</NavLink>
        }
      </div>
    </div>
  )
}

export default Navbar
