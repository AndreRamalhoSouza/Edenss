import '../styles/globals.css';
import 'slick-carousel/slick/slick.css'; // Importe o CSS base do slick
import 'slick-carousel/slick/slick-theme.css'; // Importe o CSS do tema padrão do slick (para setas e dots)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;