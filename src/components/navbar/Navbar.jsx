
import styles from "./navbar.module.css"
import { Link, NavLink } from "react-router-dom"
import ThemeToggle from "../themeToggle/ThemeToggle"


export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <imag src="/instagram.png" alt="instagram" width={24} height={24}/>
      </div>
      <Link to="/" className={styles.logo}>
      <div >AI Learner</div>
      </Link>
      <div className={styles.links}>
        <ThemeToggle  />
        
          <NavLink to="/register"  className={styles.navLink}>Sign Up</NavLink>
        
        
          <NavLink to="/login" className={styles.navLink}>Log in</NavLink>
        
        
      </div>
    </div>
  )
}

export default Navbar
