import ProjectCard from './ProjectCard';
import Slider from 'react-slick';
import styles from '../styles/Carousel.module.css'; // Assumindo que você tem seus estilos

const Carousel = ({ projects }) => {
  const settings = {
    // Configurações Padrão (Geralmente para Desktop)
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2, // Se quiser 2 linhas no desktop, isso fica aqui
    slidesPerRow: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    
    // Propriedades que garantem o 'arrastar' (swipe)
    swipe: true, 
    swipeToSlide: true, 
    touchMove: true, 

    responsive: [
      // Configuração para Tablets grandes / Desktop (1024px)
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
      // Configuração para Celulares e Tablets menores (768px)
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1, 
          rows: 1, // <--- CHAVE: Mude para 1 linha para o swipe horizontal funcionar
          slidesPerRow: 1,
          infinite: true, 
          dots: true, 
          arrows: false,
          swipeToSlide: true, 
          touchMove: true, 
        }
      },
      // Configuração para Celulares pequenos (480px)
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1, // <--- CHAVE: Mude para 1 linha para o swipe horizontal funcionar
          slidesPerRow: 1,
          infinite: true,
          dots: true,
          arrows: false,
          swipeToSlide: true, 
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
            {/* O ProjectCard deve ser seu componente que exibe cada item do portfólio */}
            <ProjectCard project={project} />
          </div>
        ))}
 </Slider>
 </div>
 );
};

export default Carousel;