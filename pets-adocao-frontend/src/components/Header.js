import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>

      <div className={styles.logoContainer}>
        <img src="\images\logo.png" alt="Logo" className={styles.logo}/>
      </div>

      <nav className={styles.nav}>
     
        <Link to="/" className={styles.link}>
          HOME
        </Link>
     
        <Link to="/adotar" className={styles.link}>
          ADOTAR
        </Link>
     
        <Link to="/sobre" className={styles.link}>
          SOBRE
        </Link>
     
      </nav>
    
    </header>
  );
};

export default Header;