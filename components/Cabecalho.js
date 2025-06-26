// components/Cabecalho.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Cabecalho.module.css';

function Cabecalho() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <header className={styles.cabecalho}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <Link href="/">
            ĒDEN<span className={styles.ssColor}>SS</span>
          </Link>
        </div>
        <p className={styles.slogan}>Projetando experiências</p>
      </div>

      <div
        className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>

      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <Link href="/servicos" onClick={toggleMenu}>
              Serviços
            </Link>
          </li>
          <li>
            <Link href="/portfolio" onClick={toggleMenu}>
              Projetos
            </Link>
          </li>
          <li className={styles.nossaHistoriaItem}>
            <Link href="/sobre" onClick={toggleMenu}>
              Nossa História
            </Link>
            <span className={styles.cssLupaContainer}>
              <div className={styles.lupaCircle}></div>
              <div className={styles.lupaHandle}></div>
            </span>
          </li>
          {/* Este é o único item de contato */}
          <li className={styles.contatoMenuItem}> {/* Adicionei uma nova classe para estilizar este LI */}
            <Link
              href="/contato"
              className={styles.botaoContato}
              onClick={toggleMenu}
            >
              CONTATO
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Cabecalho;