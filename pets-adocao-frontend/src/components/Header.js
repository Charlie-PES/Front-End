import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar';

const Header = () => {
    return (
      <header className={styles.header}>

        <div className={styles.logoContainer}>
          <img src="\images\logo.png" alt="Logo" className={styles.logo}/>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
      
          <Link to="/adotar" className={styles.link}>
            Adotar
          </Link>
      
          <Link to="/sobre" className={styles.link}>
            Sobre
          </Link>
        </nav>

        <SearchBar />
      
      </header>
  );
};

export default Header;