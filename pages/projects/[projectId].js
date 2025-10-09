// pages/projects/[projectId].js

import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react'; // <-- NOVO: Importe o useState para o Modal

import { projects } from '../../data/projects'; // Mantenha esta importação CORRETA

import styles from '../../styles/ProjectDetail.module.css';

import Header from '../../components/Cabecalho';
import Footer from '../../components/Rodape';


export default function ProjectDetail({ project }) {
  const router = useRouter();

  // Estados para controlar o Modal/Lightbox
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(''); 

  // Funções para abrir e fechar o Modal
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

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
            <div 
              key={index} 
              className={styles.imageWrapper}
              // Chama a função para abrir o modal ao clicar
              onClick={() => openModal(imageSrc)} 
            >
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
      
      {/* CÓDIGO DO MODAL: Renderizado apenas se isModalOpen for true */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div 
            className={styles.modalContent} 
            // Garante que clicar na imagem dentro não feche o modal
            onClick={(e) => e.stopPropagation()} 
          >
            <button className={styles.modalCloseButton} onClick={closeModal}>
              &times;
            </button>
            <Image 
              src={selectedImage}
              alt="Imagem Ampliada"
              width={1200} 
              height={800} 
              layout="responsive"
              objectFit="contain" 
            />
          </div>
        </div>
      )}
      
    </div>
  );
}

// --- Next.js Data Fetching Functions ---

export async function getStaticPaths() {
  
  // CORREÇÃO: Garante que o array paths seja criado corretamente a partir de projects
  const paths = projects.map((project) => ({
    params: { projectId: project.id },
  }));

  // CORREÇÃO: Garante o retorno do objeto no formato esperado pelo Next.js
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