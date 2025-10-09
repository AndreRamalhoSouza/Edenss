// pages/projects/[projectId].js

import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react'; // 1. Importa o estado para o Modal

import { projects } from '../../data/projects'; // Importa os dados do projeto

import styles from '../../styles/ProjectDetail.module.css'; // Importa estilos

import Header from '../../components/Cabecalho';
import Footer from '../../components/Rodape';


export default function ProjectDetail({ project }) {
  const router = useRouter();

  // 2. Estados para controlar o Modal/Lightbox
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(''); 

  // 3. Funções para abrir e fechar o Modal
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
          {/* 4. Mapeamento das Imagens com o evento onClick */}
          {project.detailImages.map((imageSrc, index) => (
            <div 
              key={index} 
              className={styles.imageWrapper}
              onClick={() => openModal(imageSrc)} // Chama a função para abrir o modal
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
      
      {/* 5. CÓDIGO DO MODAL (Lightbox) */}
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
            {/* O Image com layout="fill" e objectFit="contain" garante o preenchimento total */}
            <Image 
              src={selectedImage}
              alt="Imagem Ampliada"
              layout="fill"          
              objectFit="contain"   
            />
          </div>
        </div>
      )}
      
    </div>
  );
}

// --- Funções de Data Fetching do Next.js (Corrigidas) ---

export async function getStaticPaths() {
  
  // O formato de retorno está garantido aqui
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