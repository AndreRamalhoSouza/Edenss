'use client'; // <-- Adicione esta linha no topo do arquivo

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
    // Para evitar o problema de hidratação com renderização condicional,
    // vamos garantir que isSearchOpen só seja ativado no cliente.
    // No entanto, o 'use client' já resolve a maioria desses problemas.
    // Manter a lógica de toggle é ok.
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
      // Usar useRouter para navegação programática pode ser mais robusto em Next.js
      // mas window.location.hash funciona para âncoras na mesma página.
      window.location.hash = targetId;
      setIsSearchOpen(false);
      setSearchTerm('');
    } else {
      alert('Seção não encontrada. Tente "Serviços", "Projetos", "Nossa História" ou "Contato".');
      setSearchTerm('');
    }
  };

  // Melhoria para o useEffect de redimensionamento:
  // Só resetar os estados se o menu/busca ESTIVEREM abertos e a tela mudar para desktop.
  // Isso minimiza a chance de um reset de estado no cliente que difere do servidor.
  useEffect(() => {
    const handleResize = () => {
      // Apenas execute a lógica se estiver em um ambiente de navegador
      if (typeof window !== 'undefined') {
        if (window.innerWidth > 1200) { // Usando 1200px como breakpoint do seu CSS
          if (isOpen) setIsOpen(false);
          if (isSearchOpen) setIsSearchOpen(false);
        }
      }
    };

    // Adiciona o listener APENAS no lado do cliente
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      // Remove o listener APENAS no lado do cliente
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
    // Dependências ajustadas: não precisa de isOpen, isSearchOpen aqui
    // pois a função handleResize já faz a checagem if (isOpen) / if (isSearchOpen)
    // O useEffect só precisa rodar uma vez na montagem para adicionar o listener.
  }, []); // <-- Dependência vazia, roda apenas na montagem/desmontagem

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
          {/* <li className={styles.projetosItem}></li> <-- Esta linha <li> está solta aqui e deve ser removida */}
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

      {/* Renderização condicional do formulário de busca: */}
      {/* Com 'use client', isso geralmente não é um problema grave de hidratação */}
      {/* porque o componente inteiro é "client-side". */}
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