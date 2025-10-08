import Head from 'next/head';
import Header from '../components/Cabecalho'; 
import Footer from '../components/Rodape';   
import ProjectCard from '../components/ProjectCard'; 
import { projects } from '../data/projects'; 
import styles from '../styles/Portfolio.module.css'; 

function Portfolio({ projects }) { 
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


export async function getStaticProps() {
 
  return {
    props: {
      projects: projects, 
    },
  };
}

export default Portfolio; 