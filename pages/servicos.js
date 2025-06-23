import Head from 'next/head';
import Header from '../components/Cabecalho';
import Footer from '../components/Rodape';
import CartaoServico from '../components/CartaoServico';
import { servicos } from '../data/conteudo'; // <-- Importação CORRETA
import styles from '../styles/Servicos.module.css';

function Servicos() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Edenss - Serviços</title>
        <meta name="description" content="Descubra os serviços de arquitetura oferecidos pela Edenss." />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.titulo}>Nossos Serviços</h1>
        <div className={styles.gradeServicos}>
          {servicos.map((servico, index) => ( // <-- USO CORRETO: 'servicos'
            <CartaoServico key={index} servico={servico} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Servicos;