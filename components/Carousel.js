// components/Carousel.js

import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ projects }) => {
  const settings = {
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

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
          slidesPerRow: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 768, // Para a maioria dos celulares (e alguns tablets menores)
        settings: {
          slidesToShow: 1, // Mostra 1 card por "tela" no carrossel
          slidesToScroll: 1, // Rola 1 card por vez
          rows: 1, // <--- Crucial: Apenas 1 linha para o carrossel deslizar horizontalmente
          slidesPerRow: 1,
          infinite: true, // DEVE ser true para rolagem contínua
          dots: true, // DEVE ser true para os indicadores
          arrows: false, // Mantém sem setas se preferir arrastar
        }
      },
      {
        breakpoint: 480, // Para celulares muito pequenos
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1, // Crucial: Apenas 1 linha
          slidesPerRow: 1,
          infinite: true,
          dots: true,
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className={styles.carouselWrapper}>
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project.id} className={styles.carouselItemWrapper}>
            <ProjectCard project={project} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;