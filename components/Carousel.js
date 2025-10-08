// components/Carousel.js

import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ projects }) => {
  const settings = {
    dots: true,           // Mostra as bolinhas
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,              // 2 linhas no desktop
    arrows: false,
    swipe: true,          // Permite arrastar no touch
    touchMove: true,      // Permite movimentação por touch
    autoplay: false,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
          dots: true,
          arrows: false,
          swipe: true,
          touchMove: true,
        }
      },
      {
        breakpoint: 768, // Tablets e celulares médios
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,        // Linha única para deslizar horizontal
          dots: true,
          arrows: false,
          swipe: true,
          touchMove: true,
        }
      },
      {
        breakpoint: 480, // Celulares pequenos
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          dots: true,
          arrows: false,
          swipe: true,
          touchMove: true,
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
