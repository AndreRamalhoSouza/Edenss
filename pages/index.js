import Head from 'next/head';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import Header from '../components/Cabecalho';
import Footer from '../components/Rodape';
import SecaoHero from '../components/SecaoHero';
import MembroEquipe from '../components/MembroEquipe';
import CartaoDepoimento from '../components/CartaoDepoimento';
import FormularioContato from '../components/FormularioContato';


import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects';



import CartaoServico from '../components/CartaoServico';
import { conteudoHero, conteudoSobreNos, membrosEquipe, depoimentos, servicos } from '../data/conteudo';


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
    { id: '6', name: 'Restaurante Envidraçado', mainImage: '/images/project6.jpg' },
  ];

  const currentProjects = projectsData || exampleProjects;

  
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const projectsPerPage = 9; 

  const totalProjects = currentProjects.length;
  const totalProjectPages = Math.ceil(totalProjects / projectsPerPage);

  const projectsToDisplay = currentProjects.slice(
    currentProjectIndex,
    currentProjectIndex + projectsPerPage
  );


  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentProjectIndex((prevIndex) => {
        const nextIndex = prevIndex + projectsPerPage;
        return nextIndex >= totalProjects ? 0 : nextIndex;
      });
    },
    onSwipedRight: () => {
      setCurrentProjectIndex((prevIndex) => {
        const nextIndex = prevIndex - projectsPerPage;
        return nextIndex < 0 ? Math.max(totalProjects - projectsPerPage, 0) : nextIndex;
      });
    },
    trackMouse: true, 
  });

  
  const [currentDepoimentoIndex, setCurrentDepoimentoIndex] = useState(0);
  const depoimentosPorPagina = 2;

  const totalDepoimentoPages = Math.ceil(depoimentos.length / depoimentosPorPagina);

  const handleClickNextDepoimento = () => {
    setCurrentDepoimentoIndex((prevIndex) => {
      const nextIndex = prevIndex + depoimentosPorPagina;
      return nextIndex >= depoimentos.length ? 0 : nextIndex;
    });
  };

  const handleClickPrevDepoimento = () => {
    setCurrentDepoimentoIndex((prevIndex) => {
      const nextIndex = prevIndex - depoimentosPorPagina;
      return nextIndex < 0 ? Math.max(depoimentos.length - depoimentosPorPagina, 0) : nextIndex;
    });
  };

  const depoimentosVisiveis = depoimentos.slice(
    currentDepoimentoIndex,
    currentDepoimentoIndex + depoimentosPorPagina
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Edenss - Arquitetura que Transforma Experiências</title>
        <meta
          name="description"
          content="Edenss é uma empresa de arquitetura especializada em ambientes de entretenimento e espaços corporativos."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <SecaoHero images={conteudoHero.imagensCarrossel} />

       
        <section className={styles.secaoSobreNos}>
          <h2 id="nossa-historia" style={{ scrollMarginTop: '130px' }} className={styles.tituloSobreNos}>
            <div className={styles.nossaAzulPequeno}>{nossaSobreNos}</div>
            <div className={styles.historiaGrande}>{historiaSobreNos}</div>
          </h2>
          <p className={styles.descricaoSobreNos}>{conteudoSobreNos.texto}</p>
          <div className={styles.divisorCinza}></div>
        </section>

       
        <section className={styles.secaoServicos}>
          <h2 id="servicos" style={{ scrollMarginTop: '130px' }} className={styles.tituloServicos}>SERVIÇOS</h2>
          <div className={styles.gradeServicos}>
            {servicos.map((servico, index) => (
              <CartaoServico key={index} servico={servico} />
            ))}
          </div>
        </section>

    
        <section className={styles.secaoPortfolio}>
          <h2 id="projetos" style={{ scrollMarginTop: '130px' }} className={styles.portfolioTitle}>PORTFÓLIO</h2>
          <div className={styles.divisorCinza}></div>

          <div {...handlers} className={styles.projectsGridContainer}>
            {projectsToDisplay.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className={styles.paginationDots}>
            {[...Array(totalProjectPages)].map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${Math.floor(currentProjectIndex / projectsPerPage) === index ? styles.active : ''}`}
                onClick={() => setCurrentProjectIndex(index * projectsPerPage)}
              ></span>
            ))}
          </div>
        </section>

       
        <section className={styles.secaoEquipe}>
          <div className={styles.gradeEquipe}>
            {membrosEquipe.map((membro, index) => (
              <MembroEquipe key={index} membro={membro} />
            ))}
          </div>
        </section>

        
        <section className={styles.secaoDepoimentos}>
          <h2 id="secao-depoimentos" style={{ scrollMarginTop: '130px' }}>DEPOIMENTOS</h2>
          <div className={styles.divisorGray}></div>

          <div className={styles.depoimentosCarouselContainer}>
            <button
              className={`${styles.carouselArrowDepoimento} ${styles.arrowLeftDepoimento}`}
              onClick={handleClickPrevDepoimento}
            >
              &#10094;
            </button>

            <div className={styles.gradeDepoimentos}>
              {depoimentosVisiveis.map((depoimento) => (
                <CartaoDepoimento key={depoimento.nome} depoimento={depoimento} />
              ))}
            </div>

            <button
              className={`${styles.carouselArrowleftDepoimento} ${styles.carouselArrowRightDepoimento}`}
              onClick={handleClickNextDepoimento}
            >
              &#10095;
            </button>
          </div>

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

       
        <section id="contato">
          <FormularioContato />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
