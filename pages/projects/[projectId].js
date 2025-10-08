// pages/projects/[projectId].js

import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Image from 'next/image';

import { projects } from '../../data/projects';


import styles from '../../styles/ProjectDetail.module.css';


import Header from '../../components/Cabecalho';
import Footer from '../../components/Rodape';


export default function ProjectDetail({ project }) {
  const router = useRouter();

  if (!project) { 
    if (router.isFallback) {
      return <p className={styles.loading}>Carregando projeto...</p>;
    }
    return <p className={styles.loading}>Projeto não encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{project.name} | Portfólio Edenss</title>
        <meta name="description" content={project.description} />
      </Head>

      <Header />

      <main className={styles.main}>
        
        <button onClick={() => router.push('/')} className={styles.backButton}>
          ← Página Inicial
        </button>

        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.detailImagesGrid}>
          {project.detailImages.map((imageSrc, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={imageSrc}
                alt={`${project.name} - Imagem ${index + 1}`}
                width={800}
                height={600}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}



export async function getStaticPaths() {
 
  const paths = projects.map((project) => ({
    params: { projectId: project.id },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {

  const project = projects.find((p) => p.id === params.projectId);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
  
      project: JSON.parse(JSON.stringify(project)),
    },
    revalidate: 60, 
  };
}