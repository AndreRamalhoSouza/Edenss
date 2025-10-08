import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Função para agrupar os portfólios em blocos de 6
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Carousel = ({ projects }) => {
  const slides = chunkArray(projects, 6); // cada slide terá 6 portfólios

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,       // 1 bloco de 6 por vez
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
  };

  return (
    <div className={styles.carouselWrapper}>
      <Slider {...settings}>
        {slides.map((group, index) => (
          <div key={index} className={styles.carouselItemWrapper}>
            <div className={styles.groupWrapper}>
              {group.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
