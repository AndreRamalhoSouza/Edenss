import Head from 'next/head';
import Header from '../components/Cabecalho';
import Footer from '../components/Rodape';
import FormularioContato from '../components/FormularioContato';
import { infoContato } from '../data/conteudo'; // Você pode manter essa importação se 'infoContato' for usado em outro lugar no componente 'Contato'
import styles from '../styles/Contato.module.css';

function Contato() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Edenss - Contato</title>
        <meta name="description" content="Entre em contato com a Edenss para projetos de arquitetura e consultas." />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.titulo}>Fale Conosco</h1>
        <div className={styles.conteudoContato}>
          <FormularioContato />
          <div className={styles.detalhesContato}>
            <h3>Informações de Contato</h3>
            {/* As linhas abaixo foram removidas:
            <p>Email Samuel: {infoContato.emailSamuel}</p>
            <p>Email Susi: {infoContato.emailSusi}</p>
            */}
            {/* Adicione número de telefone se disponível */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contato;