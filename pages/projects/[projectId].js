// pages/projects/[projectId].js

import { useRouter } from 'next/router'; // Ainda necessário para router.isFallback ou router.push
import Head from 'next/head';
import Image from 'next/image';
// Importe corretamente: se 'projects' é um named export, use chaves.
// Pelo seu screenshot, a constante 'projects' não parece ter 'export default'.
// Se a declaração em data/projects.js for 'export const projects = [...]', então use:
import { projects } from '../../data/projects';
// Se a declaração em data/projects.js for 'const projects = [...]' e depois 'export default projects;', então use:
// import projects from '../../data/projects'; // Mantive o seu como exemplo, mas verifique o seu data/projects.js

import styles from '../../styles/ProjectDetail.module.css';

// Importe seus componentes de cabeçalho e rodapé - CUIDADO com o caminho
// Se 'pages/projects/[projectId].js' está dentro de 'pages/projects',
// e 'components' está na raiz do projeto, então você precisa de DUAS '..'
// para voltar à raiz do projeto e então entrar em 'components'.
import Header from '../../components/Cabecalho';
import Footer from '../../components/Rodape';

// O componente ProjectDetail agora recebe 'project' como prop, vindo de getStaticProps
export default function ProjectDetail({ project }) {
  const router = useRouter();

  // Se o projeto não for encontrado em tempo de build (fallback: false)
  // ou se estiver em modo fallback (fallback: true) durante o desenvolvimento
  if (!project) { // Isso pode ser verificado se getStaticProps retorna notFound: true
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
        {/* Usar Link para navegação mais robusta ou router.push() */}
        <button onClick={() => router.push('/portfolio')} className={styles.backButton}>
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

// --- Funções de Geração Estática (Cruciais para Performance com Next.js) ---

export async function getStaticPaths() {
  // Verifique como 'projects' é importado aqui. Se for 'named export', use chaves.
  const paths = projects.map((project) => ({
    params: { projectId: project.id },
  }));

  return {
    paths,
    fallback: false, // Se 'false', qualquer caminho não definido resultará em 404
  };
}

export async function getStaticProps({ params }) {
  // Encontra o projeto correspondente ao ID dos parâmetros
  // Verifique como 'projects' é importado aqui (com ou sem chaves)
  const project = projects.find((p) => p.id === params.projectId);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      // **PASSE OS DADOS DO PROJETO AQUI!**
      // É uma boa prática serializar o objeto se ele tiver datas ou outras estruturas complexas.
      project: JSON.parse(JSON.stringify(project)),
    },
    revalidate: 60, // Opcional: Revalidar a página a cada 60 segundos (ISR)
  };
}