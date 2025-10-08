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
  swipe: true,
  swipeToSlide: true, 

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
        rows: 1,
        slidesPerRow: 1,
        infinite: true,
        dots: true,
        arrows: false,
        swipe: true,
        swipeToSlide: true,
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
      },
    },
    {
      breakpoint: 360,
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