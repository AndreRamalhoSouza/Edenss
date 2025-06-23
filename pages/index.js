// pages/index.js

import Head from 'next/head';
import Header from '../components/Cabecalho';
import Footer from '../components/Rodape';
import SecaoHero from '../components/SecaoHero';
import MembroEquipe from '../components/MembroEquipe';
import CartaoDepoimento from '../components/CartaoDepoimento';
import FormularioContato from '../components/FormularioContato';

// --- NOVOS IMPORTS PARA O CARROSSEL (já existentes) ---
import Carousel from '../components/Carousel';
import projects from '../data/projects';
// --- FIM DOS NOVOS IMPORTS ---

// --- NOVOS IMPORTS PARA A SEÇÃO DE SERVIÇOS ---
import CartaoServico from '../components/CartaoServico'; // Importa o novo componente
import { conteudoHero, conteudoSobreNos, membrosEquipe, depoimentos, servicos } from '../data/conteudo'; // Importa os dados dos serviços
// --- FIM DOS NOVOS IMPORTS PARA A SEÇÃO DE SERVIÇOS ---

import styles from '../styles/Home.module.css';

function Home() {
  const partesTituloSobreNos = conteudoSobreNos.titulo.split(' ');
  const nossaSobreNos = partesTituloSobreNos[0];
  const historiaSobreNos = partesTituloSobreNos.slice(1).join(' ');

  return (
    <div className={styles.container}>
      <Head>
        <title>Edenss - Arquitetura que Transforma Experiências</title>
        <meta name="description" content="Edenss é uma empresa de arquitetura especializada em ambientes de entretenimento e espaços corporativos." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <SecaoHero titulo={conteudoHero.titulo} imagem={conteudoHero.imagem} />

        <section className={styles.secaoSobreNos}>
          <h2 className={styles.tituloSobreNos}>
            <div className={styles.nossaAzulPequeno}>{nossaSobreNos}</div>
            <div className={styles.historiaGrande}>{historiaSobreNos}</div>
          </h2>
          <p className={styles.descricaoSobreNos}>{conteudoSobreNos.texto}</p>
          <div className={styles.divisorCinza}></div>
        </section>

        {/* --- SEÇÃO DE SERVIÇOS (AGORA AQUI) --- */}
        <section className={styles.secaoServicos}>
          <h2 className={styles.tituloServicos}>SERVIÇOS</h2>
          
          <div className={styles.gradeServicos}>
            {servicos.map((servico, index) => (
              <CartaoServico key={index} servico={servico} />
            ))}
          </div>
        </section>
        {/* --- FIM DA SEÇÃO DE SERVIÇOS --- */}

        {/* --- SEÇÃO DE PORTFÓLIO COM O CARROSSEL (AGORA AQUI) --- */}
        <section className={styles.secaoPortfolio}>
          <h2 className={styles.tituloPortfolio}> PORTFÓLIO</h2>
         
          <Carousel projects={projects} />
        </section>
        {/* --- FIM DA SEÇÃO DE PORTFÓLIO --- */}

        {/* --- SEÇÃO DA EQUIPE (AGORA AQUI) --- */}
        <section className={styles.secaoEquipe}>
          
          <div className={styles.gradeEquipe}>
            {membrosEquipe.map((membro, index) => (
              <MembroEquipe key={index} membro={membro} />
            ))}
          </div>
        </section>
        {/* --- FIM DA SEÇÃO DA EQUIPE --- */}

        {/* --- SEÇÃO DE DEPOIMENTOS (AGORA AQUI) --- */}
        <section className={styles.secaoDepoimentos}>
          <h2>DEPOIMENTOS</h2>
          <div className={styles.divisorGray}></div>
          <div className={styles.gradeDepoimentos}>
            {depoimentos.map((depoimento, index) => (
              <CartaoDepoimento key={index} depoimento={depoimento} />
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