// components/ProjectCard.js

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/ProjectCard.module.css'; // O estilo para o card

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`} passHref>
      {/* Usamos div como wrapper para o Link para aplicar estilos diretamente ao card */}
      <div className={styles.card}>
        <Image
          src={project.mainImage}
          alt={project.name}
          width={400} // Largura base, Next.js otimiza
          height={300} // Altura base, Next.js otimiza
          layout="responsive" // Ou "fill" se o parent tiver position: relative e width/height fixos
          objectFit="cover" // Garante que a imagem cubra a área sem distorcer
        />
        <div className={styles.overlay}>
          <h3>{project.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;