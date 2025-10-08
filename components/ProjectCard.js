// components/ProjectCard.js

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/ProjectCard.module.css'; 

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`} passHref>
      <div className={styles.card}>
        <Image
          src={project.mainImage}
          alt={project.name}
          width={400}
          height={300}
          objectFit="cover"
        />
        <div className={styles.overlay}>
          <h3>{project.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;