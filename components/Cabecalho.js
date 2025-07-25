// components/Cabecalho.js

import { useState, useEffect, useRef } from 'react'; // Importe useRef
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Certifique-se de que esta linha está aqui
import styles from '../styles/Cabecalho.module.css';
import Mark from 'mark.js'; // Importe mark.js

// Função auxiliar para remover acentos
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function Cabecalho() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
  const router = useRouter(); // Inicialize o useRouter aqui
=======
  const [currentMarkInstance, setCurrentMarkInstance] = useState(null); // Para gerenciar a instância de mark.js
  const [highlightedCount, setHighlightedCount] = useState(0); // Para contar ocorrências
  const [currentIndex, setCurrentIndex] = useState(-1); // Para o índice da ocorrência atual
  const searchResultsRef = useRef([]); // Para armazenar os elementos destacados
>>>>>>> 085f7a3e0e080d2dd7f06df5a9b0cfe1570f4b0a

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isSearchOpen) {
      setIsSearchOpen(false);
      clearHighlights(); // Limpa destaques se o menu for aberto e a busca estava ativa
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isOpen) setIsOpen(false);
    setSearchTerm('');
    clearHighlights(); // Sempre limpa os destaques ao abrir/fechar a busca
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

<<<<<<< HEAD
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
=======
    if (!normalizedTerm) {
      alert('Por favor, digite um termo para buscar.');
      return;
    }

    // Inicializa mark.js no elemento body (ou em um container específico do seu conteúdo)
    const context = document.body; // Altere para um container específico se necessário (ex: document.getElementById('main-content'))
    const markInstance = new Mark(context);
    setCurrentMarkInstance(markInstance);

    // Faz a marcação
    markInstance.mark(normalizedTerm, {
      "separateWordSearch": false, // Permite buscar frases
      "ignoreJoiners": true, // Ignora hífens e outros "joiners"
      "diacritics": false, // Não diferencia acentos (já tratamos com removeAccents no searchTerm)
      "accuracy": "partially", // Encontra ocorrências parciais da palavra
      "acrossElements": true, // Permite que a palavra esteja quebrada entre elementos HTML
      "className": styles.highlightedText, // Classe CSS para o destaque
      "done": (occurrences) => {
        setHighlightedCount(occurrences);
        searchResultsRef.current = Array.from(context.querySelectorAll(`.${styles.highlightedText}`));
        if (occurrences > 0) {
          setCurrentIndex(0); // Começa na primeira ocorrência
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
>>>>>>> 085f7a3e0e080d2dd7f06df5a9b0cfe1570f4b0a
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
        clearHighlights(); // Limpa destaques em telas maiores
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearHighlights(); // Limpa destaques ao desmontar o componente
    };
  }, []); // Dependências ajustadas, não precisa de isOpen e isSearchOpen aqui

  // Limpa destaques quando a busca é fechada explicitamente pelo usuário
  useEffect(() => {
    if (!isSearchOpen) {
      clearHighlights();
    }
  }, [isSearchOpen]);


  return (
    <header className={styles.cabecalho}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <a
<<<<<<< HEAD
            href="/" // Mude para "/" para indicar a página inicial
            onClick={handleLogoClick} // Use a nova função de clique
=======
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
>>>>>>> 085f7a3e0e080d2dd7f06df5a9b0cfe1570f4b0a
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