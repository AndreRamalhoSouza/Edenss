import Head from 'next/head';
import Header from '../components/Cabecalho'; // Caminho corrigido
import Footer from '../components/Rodape';   // Caminho corrigido
import ProjectCard from '../components/ProjectCard'; // Seu componente ProjectCard
import { projects } from '../data/projects'; // Importa a lista de projetos do seu 'data/projects.js'
import styles from '../styles/Portfolio.module.css'; // Crie um CSS para a página de portfólio (ou use um existente)

function Portfolio({ projects }) { // O nome da prop 'projects' aqui deve ser o mesmo que você passa em 'getStaticProps'
  return (
    <div className={styles.container}>
      <Head>
        <title>Edenss - Portfólio</title>
        <meta name="description" content="Confira nossos projetos de arquitetura inovadores da Edenss." />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Nossos Projetos</h1>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Esta função busca todos os projetos no momento da build para pré-renderizar a lista
export async function getStaticProps() {
  // Retorna os dados de todos os projetos diretamente do seu 'data/projects.js'
  return {
    props: {
      projects: projects, // Certifique-se que 'projects' é o nome da sua constante no 'data/projects.js'
    },
  };
}

export default Portfolio; // Isso é crucial: exportar o componente React como default