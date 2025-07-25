// components/Cabecalho.js

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Cabecalho.module.css';
import Mark from 'mark.js';

// Função auxiliar para remover acentos
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function Cabecalho() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMarkInstance, setCurrentMarkInstance] = useState(null);
  const [highlightedCount, setHighlightedCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const searchResultsRef = useRef([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isSearchOpen) {
      setIsSearchOpen(false);
      clearHighlights();
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isOpen) setIsOpen(false);
    setSearchTerm('');
    clearHighlights();
  };

  // Limpa todos os destaques da página
  const clearHighlights = () => {
    if (currentMarkInstance) {
      currentMarkInstance.unmark();
      setCurrentMarkInstance(null);
    }
    setHighlightedCount(0);
    setCurrentIndex(-1);
    searchResultsRef.current = [];
  };

  // Função para rolar para a próxima/anterior ocorrência
  const scrollToHighlight = (index) => {
    if (searchResultsRef.current[index]) {
      searchResultsRef.current.forEach((el) => { // Removido o 'i' desnecessário aqui
        if (el.classList.contains(styles.currentHighlight)) {
          el.classList.remove(styles.currentHighlight);
        }
      });
      searchResultsRef.current[index].classList.add(styles.currentHighlight);
      searchResultsRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    clearHighlights();

    const normalizedTerm = removeAccents(searchTerm).toLowerCase().trim();

    if (!normalizedTerm) {
      alert('Por favor, digite um termo para buscar.');
      return;
    }

    const context = document.body;
    const markInstance = new Mark(context);
    setCurrentMarkInstance(markInstance);

    markInstance.mark(normalizedTerm, {
      "separateWordSearch": false,
      "ignoreJoiners": true,
      "diacritics": false,
      "accuracy": "partially",
      "acrossElements": true,
      "className": styles.highlightedText,
      "done": (occurrences) => {
        setHighlightedCount(occurrences);
        searchResultsRef.current = Array.from(context.querySelectorAll(`.${styles.highlightedText}`));
        if (occurrences > 0) {
          setCurrentIndex(0);
          scrollToHighlight(0);
        } else {
          alert(`Nenhuma ocorrência encontrada para "${searchTerm}".`);
        }
      }
    });
  };

  const goToNext = () => {
    if (highlightedCount > 0) {
      const nextIndex = (currentIndex + 1) % highlightedCount;
      setCurrentIndex(nextIndex);
      scrollToHighlight(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (highlightedCount > 0) {
      const prevIndex = (currentIndex - 1 + highlightedCount) % highlightedCount;
      setCurrentIndex(prevIndex);
      scrollToHighlight(prevIndex);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setIsOpen(false);
        setIsSearchOpen(false);
        clearHighlights();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearHighlights();
    };
  }, [clearHighlights]); // Adicionado clearHighlights aqui

  useEffect(() => {
    if (!isSearchOpen) {
      clearHighlights();
    }
  }, [isSearchOpen, clearHighlights]); // Adicionado clearHighlights aqui também

  return (
    <header className={styles.cabecalho}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
            placeholder="Buscar na página..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
          {highlightedCount > 0 && (
            <div className={styles.searchNavigation}>
              <button type="button" onClick={goToPrevious} disabled={highlightedCount <= 1}>
                &lt; Anterior
              </button>
              <span>{currentIndex + 1} / {highlightedCount}</span>
              <button type="button" onClick={goToNext} disabled={highlightedCount <= 1}>
                Próximo &gt;
              </button>
              <button type="button" onClick={clearHighlights} className={styles.clearSearchButton}>
                X
              </button>
            </div>
          )}
        </form>
      )}
    </header>
  );
}

export default Cabecalho;