
import styles from "./navbar.module.css"
import { NavLink } from "react-router-dom"
import ThemeToggle from "../themeToggle/ThemeToggle"


export const Navbar = () => {
  return (
    <div className={styles.container}>
      
      <div className={styles.logo}>AI Learner</div>
      <div className={styles.links}>
        <ThemeToggle  />
        
          <NavLink to="/register"  className={styles.navLink}>Sign Up</NavLink>
        
        
          <NavLink to="/login" className={styles.navLink}>Log in</NavLink>
        
        
      </div>
    </div>
  )
}

export default Navbar
