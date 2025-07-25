// components/Cabecalho.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Certifique-se de que esta linha está aqui
import styles from '../styles/Cabecalho.module.css';

// Função auxiliar para remover acentos
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function Cabecalho() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); // Inicialize o useRouter aqui

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isOpen) setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const normalizedTerm = removeAccents(searchTerm).toLowerCase().trim();

    const sections = {
      'servicos': 'servicos',
      'projetos': 'projetos',
      'portfolio': 'projetos',
      'portifolio': 'projetos',
      'nossa historia': 'nossa-historia',
      'historia': 'nossa-historia',
      'sobre': 'nossa-historia',
      'quem somos': 'nossa-historia',
      'contato': 'contato',
      'fale conosco': 'contato',
      'equipe': 'secao-equipe',
      'time': 'secao-equipe',
      'depoimentos': 'secao-depoimentos',
    };

    let targetId = sections[normalizedTerm];

    if (!targetId) {
      for (const key in sections) {
        if (removeAccents(key).toLowerCase().includes(normalizedTerm)) {
          targetId = sections[key];
          break;
        }
      }
    }

    if (targetId) {
      // Se estiver na página inicial, rola para a seção.
      // Se estiver em outra página, navega para a home com o hash.
      if (router.pathname === '/') {
        window.location.hash = targetId;
      } else {
        router.push(`/#${targetId}`);
      }
      setIsSearchOpen(false);
      setSearchTerm('');
    } else {
      alert('Seção não encontrada. Tente "Serviços", "Projetos", "Nossa História" ou "Contato".');
      setSearchTerm('');
    }
  };

  // Nova função para o clique na logo
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (router.pathname === '/') {
      // Se já estiver na página inicial, apenas rola para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Remove o hash da URL se houver um
      if (window.location.hash) {
        router.replace(window.location.pathname, undefined, { shallow: true });
      }
    } else {
      // Se estiver em outra página, navega para a página inicial (raiz)
      router.push('/');
      // A propriedade scroll-behavior: smooth no html do globals.css
      // se encarregará da rolagem suave para o topo na nova página.
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, isSearchOpen]);

  return (
    <header className={styles.cabecalho}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <a
            href="/" // Mude para "/" para indicar a página inicial
            onClick={handleLogoClick} // Use a nova função de clique
          >
            <Image
              src="/images/logo.png"
              alt="Logo da Empresa"
              width={150}
              height={50}
              priority
              className={styles.logoCabecalho}
            />
          </a>
        </div>
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
            {/* Ajuste os Links de navegação para lidar com navegação de página cruzada */}
            <Link href="/#servicos" onClick={toggleMenu}>
              Serviços
            </Link>
          </li>
          <li>
            <Link href="/#projetos" onClick={toggleMenu}>
              Projetos
            </Link>
          </li>
          <li className={styles.nossaHistoriaItem}>
            <Link href="/#nossa-historia" onClick={toggleMenu}>
              Nossa História
            </Link>
            <span className={styles.cssLupaContainer} onClick={toggleSearch}>
              <div className={styles.lupaCircle}></div>
              <div className={styles.lupaHandle}></div>
            </span>
          </li>
          <li className={styles.contatoMenuItem}>
            <Link
              href="/#contato"
              className={styles.botaoContato}
              onClick={toggleMenu}
            >
              CONTATO
            </Link>
          </li>
        </ul>
      </nav>

      {isSearchOpen && (
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </form>
      )}
    </header>
  );
}

export default Cabecalho;