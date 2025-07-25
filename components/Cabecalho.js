// components/Cabecalho.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Cabecalho.module.css';

// Importa os conteúdos do seu arquivo de dados
import {
  conteudoHero,
  conteudoSobreNos,
  servicos,
  membrosEquipe,
  depoimentos,
  infoContato,
} from '../data/conteudo'; // Assumindo que você tem um arquivo data/conteudo.js ou similar

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

    const normalizedTerm = removeAccents(searchTerm).toLowerCase().trim();

    // Mapeamento de termos de busca para IDs de seção
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
      'equipe': 'secao-equipe', // Supondo que você tem uma seção com este ID
      'time': 'secao-equipe',
      'depoimentos': 'secao-depoimentos', // Supondo que você tem uma seção com este ID
      'testemunhos': 'secao-depoimentos',
      'master planning': 'servicos',
      'desenvolvimento criativo': 'servicos',
      'consultoria estrategica': 'servicos',
      'piscinas': 'servicos',
      'parques tematicos': 'servicos',
      'hoteis': 'servicos',
      'arquitetura': 'conteudo-principal', // Termo genérico, pode levar para o topo ou uma seção principal
      'edenss': 'nossa-historia',
      'samuel': 'secao-equipe', // Pode levar para a seção da equipe
      'susi': 'secao-equipe', // Pode levar para a seção da equipe
      'email samuel': 'contato',
      'email susi': 'contato',
      'contato samuel': 'contato',
      'contato susi': 'contato',
      'planejamento': 'servicos', // Termo genérico, pode levar para a seção de serviços
      'design grafico': 'servicos', // Termo genérico, pode levar para
      'consultoria': 'servicos', // Termo genérico, pode levar para a seção de serviços
      'piscinas residenciais': 'servicos', // Termo genérico, pode
      'parques temáticos': 'servicos', // Termo genérico, pode levar para a seção de serviços
      'hotéis': 'servicos', // Termo genérico, pode levar para a
      'arquitetura urbanismo': 'nossa-historia', // Termo genérico, pode levar para a seção de história
      'arquitetura e urbanismo': 'nossa-historia', // Termo
      'arquitetura e urbanismo edenss': 'nossa-historia', // Termo genérico, pode levar para a seção de história
      'arquitetura urbanismo edenss': 'nossa-historia', //
      'arquitetura edenss': 'nossa-historia', // Termo genérico, pode levar para a seção de história
      'urbanismo edenss': 'nossa-historia', // Termo gen
      'edenss arquitetura': 'nossa-historia', // Termo genérico, pode levar para a seção de história
      'edenss urbanismo': 'nossa-historia', // Termo gen
      'Especializada em ambientes de entretenimento e espaços corporativos, a Ēdenss, liderada pelos arquitetos Samuel Vidal e Susi Abissamra, cria projetos inovadores para hotéis, pousadas e parques aquáticos. Integrando estética, funcionalidade e tendências de mercado, a empresa desenvolve espaços interativos que proporcionam experiências inesquecíveis e autênticas. Nosso portfólio abrange uma vasta gama de projetos, incluindo hotéis, pousadas e parques aquáticos, onde cada detalhe é cuidadosamente planejado para proporcionar experiências memoráveis. Na Ēdenss, acreditamos que a arquitetura vai além da estética; ela deve integrar funcionalidade, tecnologia e as mais recentes tendências de mercado para desenvolver espaços verdadeiramente interativos e envolventes.': 'nossa-historia', // Texto completo, pode levar para a seção de história
      'Arquiteto, Gestor e Criador de Espaços Extraordinários': 'secao-equipe', // Nome do membro da equipe
      'Arquiteta Especialista em Hotelaria e Entretenimento': 'secao-equipe', // Nome do membro da equipe
      'Samuel Vidal': 'secao-equipe', // Nome do membro da equipe
      'Susi Abissamra': 'secao-equipe', // Nome do membro da equipe
      'Samuel': 'secao-equipe', // Nome do membro da equipe
      'Susi': 'secao-equipe', // Nome do membro da equipe
      'Formada em Arquitetura e Urbanismo, com pós-graduação em Arquitetura Hoteleira e cursando MBA em Arquitetura Hoteleira, Susi possui ampla experiência em projetos de atrações aquáticas, parques e destinos de lazer familiar. Seu conhecimento abrange o design de produtos para hotéis, pousadas e parques aquáticos, enriquecido por viagens ao redor do mundo, que lhe deram uma visão inovadora do setor. Na Edenss, sua missão é criar experiências únicas e inesquecíveis, projetando ambientes que encantam, conectam e transformam sonhos em realidade.': 'secao-equipe', 
      'Samuel nos trouxe o que há de novo nos parques não só do Brasil mas do mundo, focado não só no belo design do projeto mas também na logística do empreendimento e otimização de custos, que é muito importante para mim como empresário': 'secao-depoimentos', // Citação de depoimento
      'LUÍS AUGUSTO': 'secao-depoimentos', // Nome do depoente
      'CEO THERMAS HOT WORLD': 'secao-depoimentos', // Cargo do
      'World Blue Beach': 'secao-depoimentos', // Empresa do depoente
      'OSMAR TEIXEIRA': 'secao-depoimentos', // Nome do depoente
      'Um excelente serviço no projeto de expansão do parque com rapidez, beleza e funcionalidade. Desde o design moderno até a economia operacional foram pensados com excelência no projeto': 'secao-depoimentos', // Citação de depoimento
      'CEO de [Nome da Empresa]': 'secao-depoimentos', // Cargo do depoente
      'email samuel': 'contato', // Email do Samuel
      'email susi': 'contato', // Email da Susi
      'contato samuel': 'contato', // Contato do Samuel
      'contato susi': 'contato', // Contato da Susi
      'contato': 'contato', // Termo genérico para contato  
      'fale conosco': 'contato', // Termo genérico para contato
      'contato edenss': 'contato', // Contato da empresa
      'edenss contato': 'contato', // Contato da empresa
      'edenss email': 'contato', // Email da empresa
      'edenss telefone': 'contato', // Telefone da empresa
      'edenss telefone contato': 'contato', // Telefone de contato da empresa
      'edenss email contato': 'contato', // Email de contato da empresa
      'edenss telefone contato': 'contato', // Telefone de contato da empresa
      '- OSMAR TEIXEIRA': 'secao-depoimentos', // Nome do depoente
      'PÁGINAS': 'rodape', // Termo genérico para rodapé
      'rodape': 'rodape', // Termo genérico para rodapé
      'rodapé': 'rodape', // Termo genérico para rodapé
      'rodape edenss': 'rodape', // Termo genérico para rod
      'rodapé edenss': 'rodape', // Termo genérico para rodapé
      'edenss rodape': 'rodape', // Termo genérico para rod
      'edenss rodapé': 'rodape', // Termo genérico para rodapé
      'edenss rodape contato': 'rodape', // Contato no rodapé
      'edenss rodapé email': 'rodape', // Email no rodapé
      'edenss rodape telefone': 'rodape', // Telefone no rodapé
      'edenss rodapé redes sociais': 'rodape', // Redes sociais no rodapé
      'edenss rodape links': 'rodape', // Links no rodapé
      


    };

    let targetId = sections[normalizedTerm];

    // Verifica se o termo normalizado está contido em alguma chave da seção
    if (!targetId) {
      for (const key in sections) {
        if (removeAccents(key).toLowerCase().includes(normalizedTerm)) {
          targetId = sections[key];
          break;
        }
      }
    }

    // --- Nova Lógica de Busca de Conteúdo ---
    // Se não encontrou uma seção direta, tenta encontrar nos textos
    if (!targetId) {
      // Funções auxiliares para normalizar e verificar termos
      const checkTermInText = (text, term) => removeAccents(text).toLowerCase().includes(term);

      // 1. Buscar em conteudoSobreNos
      if (checkTermInText(conteudoSobreNos.titulo, normalizedTerm) || checkTermInText(conteudoSobreNos.texto, normalizedTerm)) {
        targetId = 'nossa-historia';
      }

      // 2. Buscar em servicos
      if (!targetId) {
        for (const servico of servicos) {
          if (checkTermInText(servico.titulo, normalizedTerm)) {
            targetId = 'servicos';
            break;
          }
        }
      }

      // 3. Buscar em membrosEquipe
      if (!targetId) {
        for (const membro of membrosEquipe) {
          if (checkTermInText(membro.nome, normalizedTerm) || checkTermInText(membro.cargo, normalizedTerm) || checkTermInText(membro.bio, normalizedTerm)) {
            targetId = 'secao-equipe'; // Ou um ID mais específico se houver, ou apenas rolar para a seção da equipe
            break;
          }
        }
      }

      // 4. Buscar em depoimentos
      if (!targetId) {
        for (const depoimento of depoimentos) {
          if (checkTermInText(depoimento.nome, normalizedTerm) || checkTermInText(depoimento.titulo, normalizedTerm) || checkTermInText(depoimento.empresa, normalizedTerm) || checkTermInText(depoimento.citacao, normalizedTerm)) {
            targetId = 'secao-depoimentos'; // Ou um ID mais específico
            break;
          }
        }
      }

      // 5. Buscar em infoContato (ex: email)
      if (!targetId) {
          if (checkTermInText(infoContato.emailSamuel, normalizedTerm) || checkTermInText(infoContato.emailSusi, normalizedTerm)) {
              targetId = 'contato';
          }
      }

      // 6. Buscar em conteudoHero (título) - Pode levar para o topo
      if (!targetId && checkTermInText(conteudoHero.titulo, normalizedTerm)) {
        targetId = 'topo-da-pagina'; // Um ID para o topo da página, caso você tenha um
      }
    }
    // --- Fim da Nova Lógica de Busca de Conteúdo ---


    if (targetId) {
      // Se o targetId for para o topo da página, rolamos suavemente
      if (targetId === 'topo-da-pagina') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.hash = targetId;
      }
      setIsSearchOpen(false);
      setSearchTerm('');
    } else {
      alert('Nenhuma seção ou conteúdo relevante encontrado para "' + searchTerm + '". Tente termos como "Serviços", "Projetos", "Nossa História", "Contato", "Samuel", "Susi", "piscinas", etc.');
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