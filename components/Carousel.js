// components/Carousel.js

import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ projects }) => {
  // Configurações para desktop (2 linhas)
  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    slidesPerRow: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  // Configurações para mobile (1 linha)
  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.carouselWrapper}>
      {/* Slider para desktop */}
      <div className={styles.desktopOnly}>
        <Slider {...desktopSettings}>
          {projects.map((project) => (
            <div key={project.id} className={styles.carouselItemWrapper}>
              <ProjectCard project={project} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider para mobile */}
      <div className={styles.mobileOnly}>
        <Slider {...mobileSettings}>
          {projects.map((project) => (
            <div key={project.id} className={styles.carouselItemWrapper}>
              <ProjectCard project={project} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
