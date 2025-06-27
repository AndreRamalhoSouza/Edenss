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
          width={400} // Largura base, Next.js otimiza e define a proporção
          height={300} // Altura base, Next.js otimiza e define a proporção
          // layout="responsive" // <--- Removido: Next.js infere isso automaticamente com width/height
          objectFit="cover" // Garante que a imagem cubra a área sem distorcer (pode causar corte)
                            // Considere "contain" se quiser evitar o corte (ver CSS)
        />
        <div className={styles.overlay}>
          <h3>{project.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;