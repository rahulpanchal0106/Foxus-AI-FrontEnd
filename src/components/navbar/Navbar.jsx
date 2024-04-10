
import styles from "./navbar.module.css"
import { NavLink } from "react-router-dom"
import ThemeToggle from "../themeToggle/ThemeToggle"


export const Navbar = () => {
  return (
    <div className={styles.container}>
      
      <div className={styles.logo}>AI Learner</div>
      <div className={styles.links}>
        <ThemeToggle />
        <button className='btn' >
          <NavLink to="/register">Sign Up</NavLink>
        </button>
        <button className='btn' >
          <NavLink to="/login">Log in</NavLink>
        </button>
        
      </div>
    </div>
  )
}

export default Navbar
