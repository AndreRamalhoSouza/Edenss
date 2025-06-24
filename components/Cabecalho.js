// components/Cabecalho.js
import Link from 'next/link';
import styles from '../styles/Cabecalho.module.css';

function Cabecalho() {
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

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/servicos">
              Serviços
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              Projetos
            </Link>
          </li>
          {/* Item "Nossa História" e Lupa no mesmo <li>, mas como elementos irmãos */}
          <li className={styles.nossaHistoriaItem}>
            <Link href="/sobre">
              Nossa História
            </Link>
            {/* --- LUPA CRIADA COM CSS AQUI --- */}
            {/* Agora a lupa é apenas um span com uma única classe */}
            <span className={styles.cssLupa} /* onClick opcional aqui */></span>
            {/* --- FIM DA LUPA CRIADA COM CSS --- */}
          </li>
        </ul>
      </nav>
      <div className={styles.botaoContato}>
        <Link href="/contato">
          CONTATO
        </Link>
      </div>
    </header>
  );
}

export default Cabecalho;