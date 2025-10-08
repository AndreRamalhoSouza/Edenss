import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';

// Importa os estilos do slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ projects }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2, // duas linhas no desktop
    slidesPerRow: 1,
    arrows: false,
    autoplay: false,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true, // <--- ESSENCIAL pra permitir o swipe real no touch

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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1, // apenas 1 linha no mobile
          slidesPerRow: 1,
          infinite: true,
          dots: true,
          arrows: false,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true, // garante o arrasto no celular
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          slidesPerRow: 1,
          infinite: true,
          dots: true,
          arrows: false,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
        },
      },
    ],
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
