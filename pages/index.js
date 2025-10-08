import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/Cabecalho';
import Footer from '../components/Rodape';
import SecaoHero from '../components/SecaoHero';
import MembroEquipe from '../components/MembroEquipe';
import CartaoDepoimento from '../components/CartaoDepoimento';
import FormularioContato from '../components/FormularioContato';
import CartaoServico from '../components/CartaoServico';

import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects';
import { conteudoHero, conteudoSobreNos, membrosEquipe, depoimentos, servicos } from '../data/conteudo';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import styles from '../styles/Home.module.css';

function Home() {
  const partesTituloSobreNos = conteudoSobreNos.titulo.split(' ');
  const nossaSobreNos = partesTituloSobreNos[0];
  const historiaSobreNos = partesTituloSobreNos.slice(1).join(' ');

  const currentProjects = projectsData;

  // --- Depoimentos ---
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
      return nextIndex < 0 ? (depoimentos.length - depoimentosPorPagina < 0 ? 0 : depoimentos.length - depoimentosPorPagina) : nextIndex;
    });
  };

  const depoimentosVisiveis = depoimentos.slice(
    currentDepoimentoIndex,
    currentDepoimentoIndex + depoimentosPorPagina
  );

  // --- Configuração do Slider para o Portfólio ---
  const portfolioSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    arrows: false,
    swipe: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, rows: 2, dots: true, arrows: false }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, rows: 1, dots: true, arrows: false }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, rows: 1, dots: true, arrows: false }
      }
    ]
  };

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

        {/* Nossa História */}
        <section className={styles.secaoSobreNos}>
          <h2 id="nossa-historia" style={{ scrollMarginTop: '130px' }} className={styles.tituloSobreNos}>
            <div className={styles.nossaAzulPequeno}>{nossaSobreNos}</div>
            <div className={styles.historiaGrande}>{historiaSobreNos}</div>
          </h2>
          <p className={styles.descricaoSobreNos}>{conteudoSobreNos.texto}</p>
          <div className={styles.divisorCinza}></div>
        </section>

        {/* Serviços */}
        <section className={styles.secaoServicos}>
          <h2 id="servicos" style={{ scrollMarginTop: '130px' }} className={styles.tituloServicos}>SERVIÇOS</h2>
          <div className={styles.gradeServicos}>
            {servicos.map((servico, index) => (
              <CartaoServico key={index} servico={servico} />
            ))}
          </div>
        </section>

        {/* Portfólio */}
        <section className={styles.secaoPortfolio}>
          <h2 id="projetos" style={{ scrollMarginTop: '130px' }} className={styles.portfolioTitle}>
            PORTFÓLIO
          </h2>
          <div className={styles.divisorCinza}></div>

          <div className={styles.carouselWrapper}>
            <Slider {...portfolioSettings}>
              {currentProjects.map((project) => (
                <div key={project.id} className={styles.carouselItemWrapper}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Equipe */}
        <section className={styles.secaoEquipe}>
          <div className={styles.gradeEquipe}>
            {membrosEquipe.map((membro, index) => (
              <MembroEquipe key={index} membro={membro} />
            ))}
          </div>
        </section>

        {/* Depoimentos */}
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
              className={`${styles.carouselArrowDepoimento} ${styles.carouselArrowRightDepoimento}`}
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

        {/* Contato */}
        <section id="contato">
          <FormularioContato />
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Home;
