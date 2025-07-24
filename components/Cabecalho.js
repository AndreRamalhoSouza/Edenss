// components/Cabecalho.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Cabecalho.module.css';

// Função auxiliar para remover acentos
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function Cabecalho() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

    // Normaliza o termo de busca: para minúsculas, remove espaços e acentos
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

    // Tenta encontrar uma correspondência exata para o termo normalizado
    let targetId = sections[normalizedTerm];

    // Se o termo normalizado não for uma chave exata,
    // verifica se o termo normalizado está contido em alguma chave da seção.
    // Isso pode ser útil para buscas mais flexíveis (ex: "historia" buscar "nossa historia").
    if (!targetId) {
      for (const key in sections) {
        if (removeAccents(key).toLowerCase().includes(normalizedTerm)) {
          targetId = sections[key];
          break; // Encontrou a primeira correspondência, sai do loop
        }
      }
    }


    if (targetId) {
      window.location.hash = targetId;
      setIsSearchOpen(false);
      setSearchTerm('');
    } else {
      alert('Seção não encontrada. Tente "Serviços", "Projetos", "Nossa História" ou "Contato".');
      setSearchTerm('');
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
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo da Empresa"
              width={150}
              height={50}
              priority
              className={styles.logoCabecalho}
            />
          </Link>
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
            <Link href="#servicos" onClick={toggleMenu}>
              Serviços
            </Link>
          </li>
          <li>
            <Link href="#projetos" onClick={toggleMenu}>
              Projetos
            </Link>
          </li>
          <li className={styles.nossaHistoriaItem}>
            <Link href="#nossa-historia" onClick={toggleMenu}>
              Nossa História
            </Link>
            <span className={styles.cssLupaContainer} onClick={toggleSearch}>
              <div className={styles.lupaCircle}></div>
              <div className={styles.lupaHandle}></div>
            </span>
          </li>
          <li className={styles.contatoMenuItem}>
            <Link
              href="#contato"
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