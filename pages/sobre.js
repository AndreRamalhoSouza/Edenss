// pages/Sobre.js
import Head from 'next/head';
import Header from '../components/Cabecalho';
import Footer from '../components/Rodape';
import MembroEquipe from '../components/MembroEquipe';
import { conteudoSobreNos, membrosEquipe } from '../data/conteudo';
import styles from '../styles/Sobre.module.css';

function Sobre() {
  const partesTitulo = conteudoSobreNos.titulo.split(' ');
  const nossa = partesTitulo[0]; // "NOSSA"
  const historia = partesTitulo.slice(1).join(' '); // "HISTÓRIA"

  return (
    <div className={styles.container}>
      <Head>
        <title>Edenss - Nossa História</title>
        <meta name="description" content="Saiba mais sobre a história e a missão da Edenss, liderada por Samuel Vidal e Susi Abissamra." />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* Ajuste aqui para usar uma div para cada parte do título */}
        <h1 className={styles.titulo}>
          <div className={styles.nossaAzulPequeno}>{nossa}</div>
          <div className={styles.historiaGrande}>{historia}</div>
        </h1>
        <p className={styles.descricao}>{conteudoSobreNos.texto}</p>
        <div className={styles.divisorCinza}></div> {/* Adicione esta linha para o traço */}

        <section className={styles.secaoEquipe}>
          <h2>Conheça Nossos Fundadores</h2>
          <div className={styles.gradeEquipe}>
            {membrosEquipe.map((membro, index) => (
              <MembroEquipe key={index} membro={membro} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Sobre;