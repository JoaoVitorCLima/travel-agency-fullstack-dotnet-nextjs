import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/categoria">Categoria</Link>
      <Link href="/produto">Produto</Link>
    </nav>
  );
};

export default Navbar;
