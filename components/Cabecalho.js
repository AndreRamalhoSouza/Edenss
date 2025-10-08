// components/Cabecalho.js

import { useState, useEffect, useRef, useCallback } from 'react'; // Adicionado useCallback
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [currentMarkInstance, setCurrentMarkInstance] = useState(null);
  const [highlightedCount, setHighlightedCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const searchResultsRef = useRef([]);

  // **Corrigido**: clearHighlights envolvido em useCallback para estabilidade
  const clearHighlights = useCallback(() => {
    if (currentMarkInstance) {
      currentMarkInstance.unmark();
      setCurrentMarkInstance(null);
    }
    setHighlightedCount(0);
    setCurrentIndex(-1);
    searchResultsRef.current = [];
  }, [currentMarkInstance]); // currentMarkInstance é uma dependência aqui

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

  // Função para rolar para a próxima/anterior ocorrência
  const scrollToHighlight = (index) => {
    if (searchResultsRef.current[index]) {
      searchResultsRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      // Adiciona uma classe temporária para destacar visualmente a ocorrência atual
      searchResultsRef.current.forEach((el) => {
        if (el.classList.contains(styles.currentHighlight)) {
          el.classList.remove(styles.currentHighlight);
        }
      });
      searchResultsRef.current[index].classList.add(styles.currentHighlight);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    clearHighlights(); // Limpa destaques antigos antes de uma nova busca

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

  // Navegar para a próxima ocorrência
  const goToNext = () => {
    if (highlightedCount > 0) {
      const nextIndex = (currentIndex + 1) % highlightedCount;
      setCurrentIndex(nextIndex);
      scrollToHighlight(nextIndex);
    }
  };

  // Navegar para a ocorrência anterior
  const goToPrevious = () => {
    if (highlightedCount > 0) {
      const prevIndex = (currentIndex - 1 + highlightedCount) % highlightedCount;
      setCurrentIndex(prevIndex);
      scrollToHighlight(prevIndex);
    }
  };

  // Nova função para o clique na logo
  const handleLogoClick = () => { // Removido 'e' pois não é mais usado com preventDefault
    if (router.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        router.replace(window.location.pathname, undefined, { shallow: true });
      }
    } else {
      router.push('/');
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
  }, [clearHighlights]); // **Corrigido**: clearHighlights adicionado às dependências

  // Limpa destaques quando a busca é fechada explicitamente pelo usuário
  useEffect(() => {
    if (!isSearchOpen) {
      clearHighlights();
    }
  }, [isSearchOpen, clearHighlights]); // **Corrigido**: clearHighlights adicionado às dependências


  return (
    <header className={styles.cabecalho}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          {/* **Corrigido**: Usando <Link> do Next.js para navegação interna */}
          <Link href="/" onClick={handleLogoClick}>
            <Image
              src="/images/edens 1.png"
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