// components/Carousel.js

import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ projects }) => {
  const settings = {
    dots: true,
    infinite: true, // Mantenha true se tiver mais de 6 projetos para rolar
    speed: 500,
    slidesToShow: 3, // Desktop: 3 cards por "slide"
    slidesToScroll: 3, // Desktop: Rola 3 de cada vez
    rows: 2, // Desktop: 2 linhas de cards
    slidesPerRow: 1, // Cada slide do slick tem 1 ProjectCard dentro
    arrows: false, // Sem setas, como você pediu
    autoplay: false,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Em tablets (1024px e abaixo), 3 colunas
          slidesToScroll: 3,
          rows: 2,
          slidesPerRow: 1,
          infinite: true, // Ainda infinito
          dots: true, // Com dots
        }
      },
      {
        breakpoint: 768, // Para a maioria dos celulares (e alguns tablets menores)
        settings: {
          slidesToShow: 1, // **Mostra 1 card por "tela" no carrossel**
          slidesToScroll: 1, // **Rola 1 card por vez**
          rows: 1, // **Apenas 1 linha para o carrossel deslizar horizontalmente**
          slidesPerRow: 1, // Um ProjectCard por slide do Slick
          infinite: true, // **Ativa a rolagem infinita novamente**
          dots: true, // **Ativa os dots para navegação**
          arrows: false, // Mantém sem setas se preferir arrastar
        }
      },
      {
        breakpoint: 480, // Para celulares muito pequenos
        settings: {
          slidesToShow: 1, // Mostra 1 card por "tela"
          slidesToScroll: 1, // Rola 1 card por vez
          rows: 1, // Apenas 1 linha
          slidesPerRow: 1,
          infinite: true, // Ativa a rolagem infinita
          dots: true, // Ativa os dots
          arrows: false, // Mantém sem setas
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