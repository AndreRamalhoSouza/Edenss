// components/Carousel.js

import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ projects }) => {
  const settings = {
    dots: true,
    infinite: true, // Mantenha true se tiver mais de 6 projetos para rolar
    speed: 500,
    slidesToShow: 3, // <--- EXATAMENTE 3 POR LINHA
    slidesToScroll: 3, // Rola 3 de cada vez
    rows: 2, // <--- EXATAMENTE 2 LINHAS
    slidesPerRow: 1, // Cada slide do slick tem 1 ProjectCard dentro
    arrows: false, // Sem setas, como você pediu
    autoplay: false,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Em tablets, 2 colunas
          slidesToScroll: 2,
          rows: 2,
          slidesPerRow: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Em celulares, 1 coluna
          slidesToScroll: 1,
          rows: 2, // 2 linhas (2 cards um abaixo do outro)
          slidesPerRow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1, // 1 linha para celulares muito pequenos
          slidesPerRow: 1,
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