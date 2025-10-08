// components/Carousel.js

import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ projects }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,       // 3 colunas por linha
    slidesToScroll: 3,     // 3 slides por vez
    rows: 2,               // 2 linhas → total 6 cards por página
    slidesPerRow: 1,
    arrows: false,
    autoplay: false,
    touchMove: true,       // garante swipe
    swipeToSlide: true,    // desliza mesmo parcialmente
    responsive: [
      {
        breakpoint: 1024, // tablet/desktop pequeno
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
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,  // 1 card por vez
          slidesToScroll: 1,
          rows: 1,           // apenas 1 linha → swipe horizontal funciona
          slidesPerRow: 1,
          infinite: true,
          dots: true,
          arrows: false,
          touchMove: true,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 480, // celulares muito pequenos
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          slidesPerRow: 1,
          infinite: true,
          dots: true,
          arrows: false,
          touchMove: true,
          swipeToSlide: true,
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
