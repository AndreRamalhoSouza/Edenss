import Head from 'next/head';
import React, { useState } from 'react'; // Importe useState
import Header from '../components/Cabecalho';
import Footer from '../components/Rodape';
import SecaoHero from '../components/SecaoHero';
import MembroEquipe from '../components/MembroEquipe';
import CartaoDepoimento from '../components/CartaoDepoimento';
import FormularioContato from '../components/FormularioContato';

// --- IMPORTS DO PORTFÓLIO ---
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects';
// --- FIM DOS IMPORTS DO PORTFÓLIO ---

// --- OUTROS IMPORTS (EXISTENTES) ---
import CartaoServico from '../components/CartaoServico';
import { conteudoHero, conteudoSobreNos, membrosEquipe, depoimentos, servicos } from '../data/conteudo';
// --- FIM DOS OUTROS IMPORTS ---

import styles from '../styles/Home.module.css';

function Home() {
  const partesTituloSobreNos = conteudoSobreNos.titulo.split(' ');
  const nossaSobreNos = partesTituloSobreNos[0];
  const historiaSobreNos = partesTituloSobreNos.slice(1).join(' ');

  const exampleProjects = [
    { id: '1', name: 'Resort Paradisíaco', mainImage: '/images/project1.jpg' },
    { id: '2', name: 'Parque Aquático Aventura', mainImage: '/images/project2.jpg' },
    { id: '3', name: 'Praia Exclusiva', mainImage: '/images/project3.jpg' },
    { id: '4', name: 'Pool Lounge Elegante', mainImage: '/images/project4.jpg' },
    { id: '5', name: 'Bar Tropical', mainImage: '/images/project5.jpg' },
    { id: '6', 'name': 'Restaurante Envidraçado', mainImage: '/images/project6.jpg' },
  ];

  const currentProjects = projectsData || exampleProjects;

  const totalPages = 4;
  const currentPage = 1;

  // Carrossel de Depoimentos
  const [currentDepoimentoIndex, setCurrentDepoimentoIndex] = useState(0);
  const depoimentosPorPagina = 2; // Quantos depoimentos você quer mostrar por vez

  const totalDepoimentoPages = Math.ceil(depoimentos.length / depoimentosPorPagina);

  const handleClickNextDepoimento = () => {
    setCurrentDepoimentoIndex((prevIndex) => {
      const nextIndex = prevIndex + depoimentosPorPagina;
      return nextIndex >= depoimentos.length ? 0 : nextIndex; // Volta ao início se for o último slide
    });
  };

  const handleClickPrevDepoimento = () => {
    setCurrentDepoimentoIndex((prevIndex) => {
      const nextIndex = prevIndex - depoimentosPorPagina;
      return nextIndex < 0 ? (depoimentos.length - depoimentosPorPagina < 0 ? 0 : depoimentos.length - depoimentosPorPagina) : nextIndex;
      // Garante que não vai para índice negativo, e se for, vai para o penúltimo "slide"
      // Se não houver depoimentos suficientes para preencher um "slide" completo no final, ajusta para o início
    });
  };

  // Depoimentos a serem exibidos no slide atual
  const depoimentosVisiveis = depoimentos.slice(
    currentDepoimentoIndex,
    currentDepoimentoIndex + depoimentosPorPagina
  );


  return (
    <div className={styles.container}>
      <Head>
        <title>Edenss - Arquitetura que Transforma Experiências</title>
        <meta name="description" content="Edenss é uma empresa de arquitetura especializada em ambientes de entretenimento e espaços corporativos." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <SecaoHero images={conteudoHero.imagensCarrossel} />

        <section className={styles.secaoSobreNos}>
          <h2 className={styles.tituloSobreNos}>
            <div className={styles.nossaAzulPequeno}>{nossaSobreNos}</div>
            <div className={styles.historiaGrande}>{historiaSobreNos}</div>
          </h2>
          <p className={styles.descricaoSobreNos}>{conteudoSobreNos.texto}</p>
          <div className={styles.divisorCinza}></div>
        </section>

        {/* --- SEÇÃO DE SERVIÇOS --- */}
        <section className={styles.secaoServicos}>
          <h2 className={styles.tituloServicos}>SERVIÇOS</h2>
          <div className={styles.gradeServicos}>
            {servicos.map((servico, index) => (
              <CartaoServico key={index} servico={servico} />
            ))}
          </div>
        </section>
        {/* --- FIM DA SEÇÃO DE SERVIÇOS --- */}

        {/* --- SEÇÃO DE PORTFÓLIO --- */}
        <section className={styles.secaoPortfolio}>
          <h2 className={styles.portfolioTitle}>PORTFÓLIO</h2>
          <div className={styles.projectsGridContainer}>
            {currentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className={styles.paginationDots}>
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index + 1 === currentPage ? styles.active : ''}`}
              ></span>
            ))}
          </div>
        </section>
        {/* --- FIM DA SEÇÃO DE PORTFÓLIO --- */}

        {/* --- SEÇÃO DA EQUIPE --- */}
        <section className={styles.secaoEquipe}>
          <div className={styles.gradeEquipe}>
            {membrosEquipe.map((membro, index) => (
              <MembroEquipe key={index} membro={membro} />
            ))}
          </div>
        </section>
        {/* --- FIM DA SEÇÃO DA EQUIPE --- */}

        {/* --- SEÇÃO DE DEPOIMENTOS (AGORA COM CARROSSEL) --- */}
        <section className={styles.secaoDepoimentos}>
          <h2>DEPOIMENTOS</h2>
          <div className={styles.divisorGray}></div>

          <div className={styles.depoimentosCarouselContainer}> {/* Novo contêiner para o carrossel */}
            <button
              className={`${styles.carouselArrowDepoimento} ${styles.arrowLeftDepoimento}`}
              onClick={handleClickPrevDepoimento}
            >
              &#10094; {/* Seta para a esquerda */}
            </button>

            <div className={styles.gradeDepoimentos}>
              {/* Renderiza apenas os depoimentos visíveis no slide atual */}
              {depoimentosVisiveis.map((depoimento) => ( // Removendo o segundo parâmetro '_'
  <CartaoDepoimento key={depoimento.nome} depoimento={depoimento} />
              ))}
            </div>

            <button
              className={`${styles.carouselArrowleftDepoimento} ${styles.carouselArrowRightDepoimento}`}
              onClick={handleClickNextDepoimento}
            >
              &#10095; {/* Seta para a direita */}
            </button>
          </div>

          {/* Pontos de paginação para os depoimentos (opcional) */}
          <div className={styles.paginationDotsDepoimento}>
            {[...Array(totalDepoimentoPages)].map((_, index) => (
              <span
                key={index}
                className={`${styles.dotDepoimento} ${Math.floor(currentDepoimentoIndex / depoimentosPorPagina) === index ? styles.activeDepoimento : ''}`}
                onClick={() => setCurrentDepoimentoIndex(index * depoimentosPorPagina)}
              ></span>
            ))}
          </div>
        </section>
        {/* --- FIM DA SEÇÃO DE DEPOIMENTOS --- */}

        <FormularioContato />
      </main>

      <Footer />
    </div>
  );
}

export default Home;